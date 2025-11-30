import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";

export default function SendPage() {
  const { session } = useAuth();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    console.log("DEBUG SESSION:", session);

    if (!session?.secretKey || !session?.walletAddress) {
      alert("Wallet not loaded.");
      return;
    }

    if (!to || to.length < 20) {
      alert("Invalid recipient address.");
      return;
    }

    if (!amount) {
      alert("Enter an amount.");
      return;
    }

    // Aceita "0,1" ou "0.1"
    const normalizedAmount = Number(amount.replace(",", "."));
    if (isNaN(normalizedAmount) || normalizedAmount <= 0) {
      alert("Invalid amount.");
      return;
    }

    const payload = {
      secretKey: session.secretKey,
      recipient: to.trim(),
      amount: normalizedAmount,
    };

    console.log("DEBUG SEND PAYLOAD:", payload);

    setLoading(true);

    try {
      const res = await postJSON("/wallet/send", payload);

      console.log("DEBUG SEND RESPONSE:", res);

      if (res.error) {
        alert("Error: " + res.error);
        setLoading(false);
        return;
      }

      alert("Transaction sent!\nSignature: " + res.signature);
    } catch (err: any) {
      console.error("SEND ERROR:", err);
      alert("Failed to send transaction.");
    }

    setLoading(false);
  }

  return (
    <S.PageContainer>
      <S.Box>
        <h1>Send SOL</h1>

        <input
          placeholder="Recipient wallet"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          placeholder="Amount in SOL"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button disabled={loading} onClick={handleSend}>
          {loading ? "Sending..." : "Send"}
        </button>
      </S.Box>
    </S.PageContainer>
  );
}
