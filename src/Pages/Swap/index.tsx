import React, { useState, useEffect } from "react";
import * as S from "./styles";

import { useAuth } from "../../hooks/useAuth";
import {
  Connection,
  Keypair,
  VersionedTransaction,
} from "@solana/web3.js";

import bs58 from "bs58";

/* ------------------------------------------
   CONFIGURAÇÕES
------------------------------------------- */
const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

export default function SwapPage() {
  const auth = useAuth();

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<"SOL" | "USDC">("SOL");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [quoteInfo, setQuoteInfo] = useState<{
    outAmount?: string;
    priceImpact?: string;
  }>({});

  const [isGettingQuote, setIsGettingQuote] = useState(false);

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
    } catch (e: any) {
      throw new Error("Chave privada inválida.");
    }
  }

  /* ------------------------------------------
     INPUT VALIDATION
  ------------------------------------------- */
  function validateInputs() {
    if (!from) {
      setError("Carteira não conectada.");
      return false;
    }
    if (!secretKey) {
      setError("Chave privada não encontrada.");
      return false;
    }

    const amt = Number(amount);

    if (isNaN(amt) || amt <= 0) {
      setError("Insira um valor válido.");
      return false;
    }

    return true;
  }

  /* ------------------------------------------
     OBTÉM COTAÇÃO (HELIUS)
  ------------------------------------------- */
  async function getQuote() {
    if (!amount || Number(amount) <= 0) {
      setQuoteInfo({});
      return;
    }

    const amt = Number(amount);
    const inputMint = token === "SOL" ? SOL_MINT : USDC_MINT;
    const outputMint = token === "SOL" ? USDC_MINT : SOL_MINT;

    const smallest =
      token === "SOL"
        ? Math.floor(amt * 1_000_000_000)
        : Math.floor(amt * 1_000_000);

    try {
      setIsGettingQuote(true);

      const url = `https://quote.helius.xyz/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${smallest}&slippageBps=50`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.outAmount) {
        setQuoteInfo({});
        return;
      }

      const out =
        token === "SOL"
          ? (data.outAmount / 1_000_000).toFixed(2) // USDC
          : (data.outAmount / 1_000_000_000).toFixed(6); // SOL

      const symbol = token === "SOL" ? "USDC" : "SOL";

      setQuoteInfo({
        outAmount: `${out} ${symbol}`,
        priceImpact: data.priceImpactPct
          ? `${(data.priceImpactPct * 100).toFixed(2)}%`
          : undefined,
      });
    } catch (err) {
      console.error("Erro ao obter cotação:", err);
      setQuoteInfo({});
    } finally {
      setIsGettingQuote(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(() => getQuote(), 500);
    return () => clearTimeout(t);
  }, [amount, token]);

  /* ------------------------------------------
     HANDLE SWAP (HELIUS)
  ------------------------------------------- */
  async function handleSwap() {
    setError("");

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const amt = Number(amount);
      const inputMint = token === "SOL" ? SOL_MINT : USDC_MINT;
      const outputMint = token === "SOL" ? USDC_MINT : SOL_MINT;

      const smallest =
        token === "SOL"
          ? Math.floor(amt * 1_000_000_000)
          : Math.floor(amt * 1_000_000);

      /* ---------------------------
         1) OBTER COTAÇÃO
      ---------------------------- */
      const quoteUrl = `https://quote.helius.xyz/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${smallest}&slippageBps=50`;

      const quoteRes = await fetch(quoteUrl);
      const quote = await quoteRes.json();

      if (!quote.outAmount) throw new Error("Liquidez insuficiente.");

      /* ---------------------------
         2) GERAR TRANSAÇÃO
      ---------------------------- */
      const swapRes = await fetch("https://quote.helius.xyz/swap/v1/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPublicKey: from,
          quote: quote,
        }),
      });

      const swapJson = await swapRes.json();

      if (!swapJson.swapTransaction) {
        throw new Error("Erro ao gerar transação.");
      }

      /* ---------------------------
         3) ASSINAR TRANSAÇÃO
      ---------------------------- */
      const txBuf = Buffer.from(swapJson.swapTransaction, "base64");
      const tx = VersionedTransaction.deserialize(txBuf);

      const user = parsePrivateKey(secretKey);
      tx.sign([user]);

      /* ---------------------------
         4) ENVIAR PARA A REDE
      ---------------------------- */
      const connection = new Connection(RPC_ENDPOINT, "confirmed");

      const sig = await connection.sendRawTransaction(tx.serialize(), {
        skipPreflight: false,
        maxRetries: 3,
      });

      alert(`Swap enviado!\nTX: ${sig}`);

      setAmount("");
      setQuoteInfo({});
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ------------------------------------------
     UI
  ------------------------------------------- */
  return (
    <S.PageContainer>
      <S.NavBar>
        <button onClick={() => window.history.back()}>← Voltar</button>
        <h2>Swap (Helius)</h2>
      </S.NavBar>

      <S.Box>
        <h2>Swap SOL ↔ USDC</h2>

        {/* Carteira */}
        <S.Field>
          <label>Carteira</label>
          <div
            style={{
              padding: 10,
              fontSize: 14,
              background: "#f5f5f5",
              color: "#333",
              borderRadius: 6,
              wordBreak: "break-all",
            }}
          >
            {from || "Nenhuma carteira conectada"}
          </div>
        </S.Field>

        {/* Token */}
        <S.Field>
          <label>Token para enviar</label>
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

        {/* Amount */}
        <S.Field>
          <label>Quantidade ({token})</label>
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

        {/* Quote info */}
        {quoteInfo.outAmount && (
          <div
            style={{
              background: "#e9ffe9",
              padding: 12,
              borderRadius: 6,
              marginTop: 10,
              border: "1px solid #bde5bd",
            }}
          >
            <strong>Você receberá: </strong> {quoteInfo.outAmount}
          </div>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#ffe5e5",
              padding: 12,
              borderRadius: 6,
              color: "#900",
              marginTop: 10,
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* Swap button */}
        <button
          onClick={handleSwap}
          disabled={loading}
          style={{
            marginTop: 20,
            padding: 14,
            fontSize: 18,
            background: loading ? "#888" : "#3b82f6",
            borderRadius: 8,
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Processando..." : "Fazer Swap"}
        </button>
      </S.Box>
    </S.PageContainer>
  );
}
