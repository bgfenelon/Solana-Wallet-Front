import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";
import { PublicKey } from "@solana/web3.js";

export default function SwapPage() {
  const { session } = useAuth();

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState<"SOL_TO_USDT" | "USDT_TO_SOL">(
    "SOL_TO_USDT"
  );

  /* =========================================================
      VALIDAÇÃO ABSOLUTA DA WALLET
  ========================================================= */
  function isValidPubKey(pk: any) {
    try {
      if (!pk) return false;
      const clean = String(pk).trim();
      if (clean.length < 32 || clean.length > 50) return false;
      new PublicKey(clean);
      return true;
    } catch {
      return false;
    }
  }

  /* =========================================================
      VALIDAÇÃO DA SESSÃO
  ========================================================= */
  function validateSession() {
    if (!session) {
      alert("Nenhuma sessão encontrada.");
      return false;
    }

    // validate public key
    if (!isValidPubKey(session.walletAddress)) {
      alert("Wallet inválida. Reimporte sua carteira.");
      return false;
    }

    // secretKey agora É STRING BASE58, não array
    if (!session.secretKey || session.secretKey.length < 40) {
      alert("Chave privada inválida. Reimporte sua carteira.");
      return false;
    }

    return true;
  }

  /* =========================================================
      HANDLE SWAP (ENVIA PARA BACKEND)
  ========================================================= */
  async function handleSwap() {
    if (!validateSession()) return;

    if (!amount || Number(amount) <= 0) {
      return alert("Insira um valor válido.");
    }

    const body = {
      carteiraUsuarioPublica: session.walletAddress,
      carteiraUsuarioPrivada: session.secretKey, // base58
      amount: Number(amount),
      direction,
    };

    console.log("=== SWAP ENVIADO ===", body);

    setLoading(true);
    const res = await postJSON("/swap/usdt", body);
    setLoading(false);

    console.log("=== SWAP RESPOSTA ===", res);

    if (res.error) {
      return alert("Erro: " + res.error);
    }

    alert(`Swap realizado com sucesso!\nTx: ${res.assinatura}`);
  }

  return (
    <S.Container>
      <S.Box>
        <h1>Swap</h1>

        {/* DIREÇÃO DO SWAP */}
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
              setDirection(e.target.value as "SOL_TO_USDT" | "USDT_TO_SOL")
            }
          >
            <S.Option value="SOL_TO_USDT">SOL ➝ USDT</S.Option>
            <S.Option value="USDT_TO_SOL">USDT ➝ SOL</S.Option>
          </select>
        </div>

        {/* INPUT */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={
            direction === "SOL_TO_USDT"
              ? "Amount in SOL"
              : "Amount in USDT"
          }
        />

        {/* BOTÃO */}
        <button disabled={loading} onClick={handleSwap}>
          {loading ? "Swapping..." : "Swap"}
        </button>

        <p style={{ marginTop: "10px", opacity: 0.6, fontSize: "13px" }}>
          • Taxas da Raydium podem ser aplicadas
        </p>
      </S.Box>
    </S.Container>
  );
}
