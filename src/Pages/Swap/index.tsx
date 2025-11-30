import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";

export default function SwapPage() {
  const { session } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSwap() {
    if (!session?.secretKey) return alert("Wallet not loaded.");
    if (!session?.walletAddress) return alert("Wallet missing publicKey.");
    if (!amount || Number(amount) <= 0) return alert("Enter a valid amount.");

    setLoading(true);

    const res = await postJSON("/swap/buy", {
      carteiraUsuarioPublica: session.walletAddress,
      carteiraUsuarioPrivada: JSON.stringify(session.secretKey),
      amountSOL: Number(amount),
    });

    setLoading(false);

    if (res.error) {
      alert("Error: " + res.error);
      return;
    }

    alert(
      `Swap successful!\n\n` +
        `SOL Debited: ${res.sol_debitado}\n` +
        `PUMP Credited: ${res.pump_creditado}`
    );
  }

  return (
    <S.Container>
      <S.Box>
        <h1>Swap SOL to Token</h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount in SOL"
        />

        <button disabled={loading} onClick={handleSwap}>
          {loading ? "Swapping..." : "Swap"}
        </button>
      </S.Box>
    </S.Container>
  );
}
