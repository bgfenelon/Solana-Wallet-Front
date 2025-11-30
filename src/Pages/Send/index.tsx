import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";

export default function SwapPage() {
  const { session } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSwap() {
    if (!session?.secretKey) {
      alert("Wallet not loaded.");
      return;
    }

    setLoading(true);

    const res = await postJSON("/swap/pay", {
      secretKey: session.secretKey,
      clientAddress: session.walletAddress,
      amount: Number(amount),
    });

    setLoading(false);

    if (res.error) {
      alert("Error: " + res.error);
      return;
    }

    alert(
      "SWAP Completed!\n" + 
      "SOL Payment: " + res.solPayment + "\n" + 
      "Token Transfer: " + res.pumpTransfer + "\n" +
      "PUMP Received: " + res.pumpAmount
    );
  }

  return (
    <S.PageContainer>
      <S.Box>
        <h1>Swap SOL → PUMP</h1>

        <input
          placeholder="Amount in SOL"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button disabled={loading} onClick={handleSwap}>
          {loading ? "Processing..." : "Swap"}
        </button>
      </S.Box>
    </S.PageContainer>
  );
}
