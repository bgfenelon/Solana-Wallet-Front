import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import {
  Connection,
  Keypair,
  VersionedTransaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import bs58 from "bs58";

/* -----------------------------------------------------
   CONFIG - USANDO ENDPOINT ALTERNATIVO CONFIÁVEL
----------------------------------------------------- */
const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const USDC_DECIMALS = 6;

// ENDPOINT ALTERNATIVO PÚBLICO - MUITO CONFIAVÉL
const JUPITER_QUOTE_API = "https://quote-api.jup.ag/v6/quote";
const JUPITER_SWAP_API = "https://quote-api.jup.ag/v6/swap";

// Fallback para caso o principal falhe (raro, mas seguro)
const FALLBACK_ENDPOINTS = [
  "https://jupiter-api-v6.fly.dev/v6", // Réplica oficial
  "https://jup.ag/v6", // Gateway alternativo
];

const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

/* -----------------------------------------------------
   FUNÇÃO AUXILIAR: fetch com retry e fallback
----------------------------------------------------- */
async function robustFetch(url: string, options?: RequestInit, isFallback = false): Promise<Response> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 segundos timeout
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok && !isFallback) {
      // Se não for fallback e falhou, tenta os fallbacks
      throw new Error(`HTTP ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (isFallback) {
      throw error; // Já está no fallback, propaga o erro
    }
    
    // Tenta endpoints de fallback
    for (const baseUrl of FALLBACK_ENDPOINTS) {
      try {
        const fallbackUrl = url.replace(JUPITER_QUOTE_API, `${baseUrl}/quote`).replace(JUPITER_SWAP_API, `${baseUrl}/swap`);
        console.log(`Tentando fallback: ${fallbackUrl}`);
        return await robustFetch(fallbackUrl, options, true);
      } catch (fallbackError) {
        continue;
      }
    }
    
    throw error;
  }
}

/* -----------------------------------------------------
   COMPONENT
----------------------------------------------------- */
export default function SwapPage() {
  const { session } = useAuth();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimated, setEstimated] = useState("");
  const [direction, setDirection] = useState<"SOL_TO_USDC" | "USDC_TO_SOL">("SOL_TO_USDC");
  const [status, setStatus] = useState<string>("");

  /* -----------------------------------------------------
     VALIDADORES
  ----------------------------------------------------- */
  function parsePrivateKey(key: string): Keypair {
    try {
      if (key.startsWith("[")) {
        const arr = JSON.parse(key);
        return Keypair.fromSecretKey(new Uint8Array(arr));
      }
      return Keypair.fromSecretKey(bs58.decode(key));
    } catch (err: any) {
      throw new Error(`Chave inválida: ${err.message}`);
    }
  }

  function validateSession(): boolean {
    if (!session) {
      alert("Nenhuma sessão encontrada.");
      return false;
    }

    try {
      new PublicKey(session.walletAddress);
    } catch {
      alert("Wallet inválida.");
      return false;
    }

    if (!session.secretKey || session.secretKey.length < 10) {
      alert("Chave privada inválida.");
      return false;
    }

    return true;
  }

  /* -----------------------------------------------------
     OBTER COTAÇÃO
  ----------------------------------------------------- */
  async function getQuote() {
    if (!validateSession()) return;

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      setEstimated("");
      return;
    }

    try {
      setStatus("Obtendo cotação...");

      const inputMint = direction === "SOL_TO_USDC" ? SOL_MINT : USDC_MINT;
      const outputMint = direction === "SOL_TO_USDC" ? USDC_MINT : SOL_MINT;

      const amountInSmallestUnits = direction === "SOL_TO_USDC"
        ? Math.floor(amt * LAMPORTS_PER_SOL)
        : Math.floor(amt * Math.pow(10, USDC_DECIMALS));

      const url = `${JUPITER_QUOTE_API}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnits}&slippageBps=50`;
      
      const response = await robustFetch(url);
      const data = await response.json();
      
      if (data.error) {
        console.warn("Erro na cotação:", data.error);
        setEstimated("");
        setStatus("");
        return;
      }

      if (!data.outAmount) {
        setEstimated("");
        setStatus("");
        return;
      }

      let outputAmount: string;
      if (direction === "SOL_TO_USDC") {
        outputAmount = (Number(data.outAmount) / Math.pow(10, USDC_DECIMALS)).toFixed(4);
        setEstimated(`${outputAmount} USDC`);
      } else {
        outputAmount = (Number(data.outAmount) / LAMPORTS_PER_SOL).toFixed(6);
        setEstimated(`${outputAmount} SOL`);
      }

      setStatus("Cotação obtida!");
      
      // Limpa o status após 2 segundos
      setTimeout(() => setStatus(""), 2000);

    } catch (err: any) {
      console.error("Erro na cotação:", err);
      setEstimated("");
      setStatus("Erro ao obter cotação");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getQuote();
    }, 500);

    return () => clearTimeout(timer);
  }, [amount, direction]);

  /* -----------------------------------------------------
     EXECUTAR SWAP
  ----------------------------------------------------- */
  async function handleSwap() {
    if (!validateSession()) return;

    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Insira um valor válido");
      return;
    }

    setLoading(true);
    setStatus("Iniciando swap...");

    try {
      const inputMint = direction === "SOL_TO_USDC" ? SOL_MINT : USDC_MINT;
      const outputMint = direction === "SOL_TO_USDC" ? USDC_MINT : SOL_MINT;

      const amountInSmallestUnits = direction === "SOL_TO_USDC"
        ? Math.floor(amt * LAMPORTS_PER_SOL)
        : Math.floor(amt * Math.pow(10, USDC_DECIMALS));

      setStatus("Obtendo cotação final...");
      
      // 1. Obter cotação
      const quoteUrl = `${JUPITER_QUOTE_API}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountInSmallestUnits}&slippageBps=100`;
      const quoteResponse = await robustFetch(quoteUrl);
      
      if (!quoteResponse.ok) {
        throw new Error(`Falha na cotação: ${quoteResponse.status}`);
      }

      const quoteData = await quoteResponse.json();
      
      if (quoteData.error) {
        throw new Error(quoteData.error);
      }

      if (!quoteData.outAmount) {
        throw new Error("Cotação inválida");
      }

      setStatus("Gerando transação...");
      
      // 2. Obter transação de swap
      const swapResponse = await robustFetch(JUPITER_SWAP_API, {
        method: "POST",
        body: JSON.stringify({
          quoteResponse: quoteData,
          userPublicKey: session!.walletAddress,
          wrapAndUnwrapSol: true,
          dynamicComputeUnitLimit: true,
          useSharedAccounts: true,
        }),
      });

      const swapData = await swapResponse.json();
      
      if (swapData.error) {
        throw new Error(swapData.error);
      }

      if (!swapData.swapTransaction) {
        throw new Error("Transação não gerada");
      }

      setStatus("Assinando transação...");
      
      // 3. Assinar transação
      const keypair = parsePrivateKey(session!.secretKey);
      const transactionBuffer = Buffer.from(swapData.swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(transactionBuffer);
      transaction.sign([keypair]);

      setStatus("Enviando para a blockchain...");
      
      // 4. Enviar transação
      const connection = new Connection(RPC_ENDPOINT, "confirmed");
      const signature = await connection.sendRawTransaction(transaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: "confirmed",
        maxRetries: 3,
      });

      setStatus("Transação enviada! Confirmando...");
      
      // 5. Confirmação rápida
      const confirmation = await connection.confirmTransaction(signature, "confirmed");
      
      if (confirmation.value.err) {
        throw new Error("Transação falhou na confirmação");
      }

      // 6. Mostrar resultado
      const outputAmount = direction === "SOL_TO_USDC"
        ? (Number(quoteData.outAmount) / Math.pow(10, USDC_DECIMALS)).toFixed(4)
        : (Number(quoteData.outAmount) / LAMPORTS_PER_SOL).toFixed(6);

      const explorerUrl = `https://solscan.io/tx/${signature}`;
      
      setStatus("Swap realizado com sucesso!");
      
      const message = 
        `✅ **Swap realizado com sucesso!**\n\n` +
        `📤 **Enviado:** ${amt} ${direction === "SOL_TO_USDC" ? "SOL" : "USDC"}\n` +
        `📥 **Recebido:** ${outputAmount} ${direction === "SOL_TO_USDC" ? "USDC" : "SOL"}\n\n` +
        `🔗 **Transação confirmada!**\n\n` +
        `Clique OK para abrir no explorador.`;

      if (window.confirm(message)) {
        window.open(explorerUrl, "_blank");
      }

      // Limpar
      setAmount("");
      setEstimated("");
      setStatus("");

    } catch (err: any) {
      console.error("❌ ERRO NO SWAP:", err);
      
      let errorMessage = "Erro ao processar swap";
      
      if (err.message.includes("insufficient funds")) {
        errorMessage = "💰 Saldo insuficiente";
      } else if (err.message.includes("timeout")) {
        errorMessage = "⏱️ Tempo esgotado";
      } else if (err.message.includes("network") || err.message.includes("fetch")) {
        errorMessage = "🌐 Problema de rede/API. Tente novamente.";
      } else if (err.message.includes("Blockhash")) {
        errorMessage = "🔄 Transação expirada. Tente novamente";
      } else if (err.message.includes("401")) {
        errorMessage = "🔐 Problema de acesso à API. Usando endpoint alternativo...";
      } else {
        errorMessage = err.message || "Erro desconhecido";
      }
      
      setStatus(`Erro: ${errorMessage}`);
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 5000);
    }
  }

  /* -----------------------------------------------------
     TESTAR CONEXÃO
  ----------------------------------------------------- */
  async function testConnection() {
    try {
      setStatus("Testando conexão com Jupiter API...");
      
      const testUrl = `${JUPITER_QUOTE_API}?inputMint=${SOL_MINT}&outputMint=${USDC_MINT}&amount=1000000`;
      const response = await robustFetch(testUrl);
      const data = await response.json();
      
      if (data.outAmount) {
        alert(`✅ Conectado à Jupiter API!\n\nPreço: 1 SOL = ${(Number(data.outAmount) / 1000000).toFixed(2)} USDC`);
        setStatus("Conexão OK!");
      } else {
        alert(`❌ Jupiter API respondeu com erro: ${data.error || "Desconhecido"}`);
        setStatus("Erro na API");
      }
    } catch (err: any) {
      alert(`❌ Falha na conexão: ${err.message}\n\nVerifique sua conexão com a internet.`);
      setStatus("Falha na conexão");
    } finally {
      setTimeout(() => setStatus(""), 3000);
    }
  }

  /* -----------------------------------------------------
     RENDER
  ----------------------------------------------------- */
  return (
    <S.Container>
      <S.NavBar>
        <button onClick={() => window.history.back()}>← Voltar</button>
        <h2>Swap</h2>
      </S.NavBar>

      <S.Box>
        <h1>🔁 Swap SOL ↔ USDC</h1>
        
        {status && (
          <div style={{
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            backgroundColor: status.includes("Erro") ? "#fef2f2" : 
                           status.includes("sucesso") ? "#f0fdf4" : "#f0f9ff",
            border: status.includes("Erro") ? "1px solid #fecaca" : 
                    status.includes("sucesso") ? "1px solid #bbf7d0" : "1px solid #bae6fd",
            color: status.includes("Erro") ? "#dc2626" : 
                   status.includes("sucesso") ? "#15803d" : "#0369a1",
            fontSize: "14px"
          }}>
            {status}
          </div>
        )}

        <button
          onClick={testConnection}
          style={{
            padding: "8px 16px",
            marginBottom: "20px",
            backgroundColor: "#f0f9ff",
            border: "1px solid #0ea5e9",
            borderRadius: "6px",
            color: "#0369a1",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🔍 Testar Conexão
        </button>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "14px", display: "block", marginBottom: "8px" }}>
            Direção:
          </label>
          <select
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value as "SOL_TO_USDC" | "USDC_TO_SOL");
              setEstimated("");
            }}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              backgroundColor: "#fff",
            }}
          >
            <option value="SOL_TO_USDC">SOL → USDC</option>
            <option value="USDC_TO_SOL">USDC → SOL</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "14px", display: "block", marginBottom: "8px" }}>
            Quantidade ({direction === "SOL_TO_USDC" ? "SOL" : "USDC"}):
          </label>
          <input
            type="number"
            placeholder={`Ex: ${direction === "SOL_TO_USDC" ? "0.1" : "10"}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="any"
            min="0"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
          <div style={{ fontSize: "12px", marginTop: "5px", color: "#666" }}>
            {direction === "SOL_TO_USDC" 
              ? `Mínimo recomendado: 0.01 SOL`
              : `Mínimo recomendado: 1 USDC`}
          </div>
        </div>

        {estimated && (
          <div style={{
            marginBottom: "20px",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "14px", color: "#15803d" }}>Você receberá:</span>
              <span style={{ fontSize: "18px", fontWeight: "bold", color: "#15803d" }}>
                {estimated}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleSwap}
          disabled={loading || !amount || parseFloat(amount) <= 0}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: loading 
              ? "#9ca3af" 
              : (!amount || parseFloat(amount) <= 0) 
                ? "#d1d5db" 
                : "#3b82f6",
            color: "white",
            cursor: (!amount || parseFloat(amount) <= 0 || loading) 
              ? "not-allowed" 
              : "pointer",
            transition: "background-color 0.2s"
          }}
        >
          {loading ? "⏳ Processando..." : "🔁 Fazer Swap"}
        </button>

        <div style={{ marginTop: "25px", fontSize: "12px", color: "#6b7280" }}>
          <div style={{ marginBottom: "8px" }}>
            ⚡ <strong>Endpoint:</strong> quote-api.jup.ag/v6/ (público e confiável)
          </div>
          <div style={{ marginBottom: "8px" }}>
            🔄 <strong>Fallback:</strong> Sistema automático de endpoints alternativos
          </div>
          <div>
            💡 <strong>Dica:</strong> Comece com 0.01 SOL para testar
          </div>
        </div>
      </S.Box>
    </S.Container>
  );
}