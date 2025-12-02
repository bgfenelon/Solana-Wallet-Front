import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";
import { PublicKey } from "@solana/web3.js";

export default function SwapPage() {
  const { session } = useAuth();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Agora estamos trocando SOL ⇆ USDC
  const [direction, setDirection] = useState<"SOL_TO_USDC" | "USDC_TO_SOL">(
    "SOL_TO_USDC"
  );

  /* =========================================================
      VALIDAR PUBLIC KEY
  ========================================================= */
  function isValidPubKey(pk: any) {
    try {
      if (!pk) return false;
      new PublicKey(String(pk).trim());
      return true;
    } catch {
      return false;
    }
  }

  /* =========================================================
      VALIDAR SESSION
  ========================================================= */
  function validateSession() {
    if (!session) {
      alert("Nenhuma sessão encontrada.");
      return false;
    }

    if (!isValidPubKey(session.walletAddress)) {
      alert("Wallet inválida.");
      return false;
    }

    if (!session.secretKey || session.secretKey.length < 10) {
      alert("Chave privada inválida.");
      return false;
    }

    return true;
  }

  /* =========================================================
      HANDLE SWAP via Jupiter
  ========================================================= */
  async function handleSwap() {
    if (!validateSession()) return;

    const numericAmount = Number(amount);
    if (numericAmount <= 0) {
      return alert("Insira um valor válido.");
    }

    // --------------------------
    // DEFINIR MINTS
    // --------------------------
    let inputMint = "";
    let outputMint = "";
    let atomicAmount = 0;

    if (direction === "SOL_TO_USDC") {
      inputMint = "So11111111111111111111111111111111111111112"; // WSOL
      outputMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G3ky6a9qZ7bL92"; // USDC
      atomicAmount = Math.floor(numericAmount * 1e9); // SOL → lamports
    }

    if (direction === "USDC_TO_SOL") {
      inputMint = "EPjFWdd5AufqSSqeM2qN1xzybapC8G3ky6a9qZ7bL92"; // USDC
      outputMint = "So11111111111111111111111111111111111111112"; // WSOL
      atomicAmount = Math.floor(numericAmount * 1e6); // USDC → decimals 6
    }

    const body = {
      carteiraUsuarioPublica: session.walletAddress,
      carteiraUsuarioPrivada: session.secretKey,
      inputMint,
      outputMint,
      amount: atomicAmount,
    };

    console.log("=== SWAP ENVIADO ===", body);

    setLoading(true);
    const res = await postJSON("/swap/jupiter", body);
    setLoading(false);

    console.log("=== SWAP RESPOSTA ===", res);

    if (res.error) {
      return alert("Erro: " + res.error);
    }

    alert(`Swap realizado com sucesso!\nTx: ${res.assinatura}`);
  }

  return (
    <S.Container>
      <S.NavBar>
        <button onClick={() => window.history.back()}>← Back</button>
        <h2>Swap</h2>
      </S.NavBar>

      <S.Box>
        <h1>Swap</h1>

        {/* DIREÇÃO */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "14px" }}>Direction:</label>
          <select
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "8px",
            }}
            value={direction}
            onChange={(e) =>
              setDirection(e.target.value as "SOL_TO_USDC" | "USDC_TO_SOL")
            }
          >
            <S.Option value="SOL_TO_USDC">SOL ➝ USDC</S.Option>
            <S.Option value="USDC_TO_SOL">USDC ➝ SOL</S.Option>
          </select>
        </div>

        {/* INPUT */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={
            direction === "SOL_TO_USDC" ? "Amount in SOL" : "Amount in USDC"
          }
        />

        <button disabled={loading} onClick={handleSwap}>
          {loading ? "Swapping..." : "Swap"}
        </button>

        <p style={{ marginTop: "10px", opacity: 0.6, fontSize: "13px" }}>
          • Powered by Jupiter Aggregator API.
        </p>
      </S.Box>
    </S.Container>
  );
}
