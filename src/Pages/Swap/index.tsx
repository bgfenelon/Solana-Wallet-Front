import React, { useState, useEffect, JSX } from "react";
import * as S from "./styles";

import { useAuth } from "../../hooks/useAuth";
import {
  Connection,
  Keypair,
  VersionedTransaction
} from "@solana/web3.js";

import bs58 from "bs58";
import Navbar from "../../Components/Navbar";
import { Shield, ShieldCheck } from "lucide-react";

/* ------------------------------------------
   CONFIG
------------------------------------------- */
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://node-veilfi-jtae.onrender.com";

const RPC_ENDPOINT =
  import.meta.env.VITE_RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

/* ------------------------------------------
   HELPERS
------------------------------------------- */
function base64ToUint8Array(base64: string) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export default function SwapPage(): JSX.Element {
  const auth = useAuth();

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<"SOL" | "USDC">("SOL");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [quoteInfo, setQuoteInfo] = useState<{
    outAmount?: string;
    priceImpact?: string;
  }>({});

  const from = auth?.session?.walletAddress || "";
  const secretKey = auth?.session?.secretKey || "";

  /* ------------------------------------------
     PRIVATE KEY PARSER
  ------------------------------------------- */
  function parsePrivateKey(secretKey: string): Keypair {
    try {
      if (secretKey.startsWith("[")) {
        return Keypair.fromSecretKey(new Uint8Array(JSON.parse(secretKey)));
      }
      return Keypair.fromSecretKey(bs58.decode(secretKey));
    } catch {
      throw new Error("Invalid private key.");
    }
  }

  /* ------------------------------------------
     INPUT VALIDATION
  ------------------------------------------- */
  function validateInputs() {
    setError("");

    if (!from) {
      setError("Wallet not connected.");
      return false;
    }
    if (!secretKey) {
      setError("Private key not found.");
      return false;
    }

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      setError("Enter a valid amount.");
      return false;
    }

    return true;
  }

  /* ------------------------------------------
     DIRECTION FOR BACKEND
  ------------------------------------------- */
  function buildDirection(): "SOL_TO_USDC" | "USDC_TO_SOL" {
    return token === "SOL" ? "SOL_TO_USDC" : "USDC_TO_SOL";
  }

  /* ------------------------------------------
     GET QUOTE (BACKEND -> JUPITER)
  ------------------------------------------- */
  async function getQuote() {
    if (!amount || Number(amount) <= 0) {
      setQuoteInfo({});
      return;
    }

    const amtUI = Number(amount);

    try {
      const isSolToUsdc = token === "SOL";
      const fromToken = isSolToUsdc ? "SOL" : "USDC";
      const toToken = isSolToUsdc ? "USDC" : "SOL";

      const atomicAmount = isSolToUsdc
        ? amtUI * 1_000_000_000
        : amtUI * 1_000_000;

      const res = await fetch(`${BACKEND_URL}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: fromToken,
          to: toToken,
          amount: atomicAmount,
        }),
      });

      if (!res.ok) {
        setQuoteInfo({});
        return;
      }

      const data = await res.json();

      if (!data.outAmount) {
        setQuoteInfo({});
        return;
      }

      const out =
        token === "SOL"
          ? (data.outAmount / 1_000_000).toFixed(2)
          : (data.outAmount / 1_000_000_000).toFixed(6);

      const symbol = token === "SOL" ? "USDC" : "SOL";

      setQuoteInfo({
        outAmount: `${out} ${symbol}`,
        priceImpact: data.priceImpactPct
          ? `${(data.priceImpactPct * 100).toFixed(2)}%`
          : undefined,
      });
    } catch (err) {
      console.error("Error getting quote:", err);
      setQuoteInfo({});
    }
  }

  useEffect(() => {
    const t = setTimeout(() => getQuote(), 500);
    return () => clearTimeout(t);
  }, [amount, token]);

/* ------------------------------------------
   HANDLE SWAP
------------------------------------------- */
async function handleSwap() {
    setError("");
    if (!validateInputs()) return;

    setLoading(true);

    try {
        const amtUI = Number(amount);
        const connection = new Connection(RPC_ENDPOINT, "confirmed") as any; // Conexão inicializada

        // 1) Obter a Cotação (Quote)
        const quoteRes = await fetch(`${BACKEND_URL}/quote`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                carteiraUsuarioPublica: from,
                carteiraUsuarioPrivada: secretKey,
                amount: amtUI,
                direction: buildDirection(),
            }),
        });

        const quote = await quoteRes.json();
        if (!quoteRes.ok || !quote.outAmount) {
            // Se o backend falhou ou não encontrou liquidez
            const errorMessage = quote.error || "Failed to fetch quote or Insufficient liquidity.";
            throw new Error(errorMessage);
        }

        // 2) Requisitar Transação de Swap do Backend
        const swapRes = await fetch(`${BACKEND_URL}/swap`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                carteiraUsuarioPublica: from,
                carteiraUsuarioPrivada: secretKey,
                quote,
            }),
        });

        const swapJson = await swapRes.json();

        if (!swapRes.ok || !swapJson.swapTransaction) {
            // Captura erros do backend (como 'insufficient lamports' ou 'Failed to generate transaction')
            const errorMessage = swapJson.error || "Failed to generate swap transaction.";
            throw new Error(`Swap backend error: ${errorMessage}`);
        }

        // 3) Processar e Assinar a Transação V0
        let txBuf: Uint8Array;
        try {
            // Tratamento de erro robusto para Base64 (incluindo URL-safe e padding)
            let base64 = swapJson.swapTransaction;
            base64 = base64.replace(/-/g, '+').replace(/_/g, '/'); // URL-safe
            while (base64.length % 4) {
                base64 += '='; // Padding
            }
            txBuf = base64ToUint8Array(base64);

        } catch (e) {
            console.error("Base64 decoding failed:", e);
            throw new Error("Invalid swap transaction format (Base64 decode error).");
        }
        
        const tx = VersionedTransaction.deserialize(txBuf) as any; // Usando txBuf (Uint8Array)
        
        // 🚨 CORREÇÃO PRINCIPAL: Resolver Address Lookup Tables (ALTs)
        if (tx.version === 0 && tx.addressTableLookups && tx.addressTableLookups.length > 0) {
            console.log("Resolvendo Address Lookup Tables (ALTs)...");
            // Esta função busca os endereços de conta compactados
            await connection.fetchLookupTableAddresses(tx.addressTableLookups); 
            console.log("ALTs resolvidas com sucesso.");
        }
        
        const user = parsePrivateKey(secretKey);
        tx.sign([user]);

        // 4) Enviar e Confirmar a Transação
        const sig = await connection.sendRawTransaction(tx.serialize(), {
            skipPreflight: false,
            maxRetries: 3,
        });

        // Opcional: Adicionar espera por confirmação
        // await connection.confirmTransaction(sig, 'confirmed');

        alert(`✅ Swap concluído!\nTransaction: ${sig}`);

        setAmount("");
        setQuoteInfo({});
    } catch (err: any) {
        console.error("Swap error:", err);
        // Exibe a mensagem de erro específica, incluindo aquelas do backend
        console.log(err.message || "Erro inesperado ao realizar o Swap.");
    } finally {
        setLoading(false);
    }
}

  /* ------------------------------------------
     UI
  ------------------------------------------- */
  return (
    <>
      <Navbar name="Swap" />

      <S.PageContainer>
        <S.Box>
          <h2>Swap SOL ↔ USDC</h2>

          {/* WALLET */}
          <S.Field>
            <label>Wallet</label>
            <S.AddressBox>
              {from || "No wallet connected"}
            </S.AddressBox>
          </S.Field>

          {/* TOKEN */}
          <S.Field>
            <label>Token to send</label>
            <select
              value={token}
              onChange={(e) => {
                setToken(e.target.value as "SOL" | "USDC");
                setQuoteInfo({});
              }}
            >
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
            </select>
          </S.Field>

          {/* AMOUNT */}
          <S.Field>
            <label>Amount ({token})</label>
            <input
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(",", ".");
                if (value === "" || /^\d*\.?\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
              placeholder="0.1"
            />
          </S.Field>

          {/* QUOTE */}
          {quoteInfo.outAmount && (
            <S.QuoteBox>
              The final amount may vary due to network fees and price slippage.
            </S.QuoteBox>
          )}

          {/* ERROR */}
          {error && <S.ErrorBox>❌ {error}</S.ErrorBox>}

          {/* BUTTON */}
          <S.SwapButton onClick={handleSwap} disabled={loading}>
            {loading ? "Processing..." : "Swap"}
          </S.SwapButton>
        </S.Box>
         <S.Card>
        <S.IconContainer style={{ background: '#00c85333' }}><ShieldCheck stroke="#00c853"/></S.IconContainer>
        <div className="fontDiv">
          <h6> Trustless Exchange </h6>
          <p>Your swap is executed directly on the blockchain without intermediaries</p>
        </div>
      </S.Card> <S.Card>
        <S.IconContainer style={{ background: '#7b75ff4d' }}><Shield stroke="#7b75ff" /></S.IconContainer>
        <div className="fontDiv">
          <h6> Secure Swap </h6>
          <p>Tokens are exchanged instantly using the best available market rate.</p>
        </div>
      </S.Card>
      </S.PageContainer>
    </>
  );
}
