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
    if (!session?.walletSecret) {
      alert("Wallet not loaded");
      return;
    }

    setLoading(true);

    try {
      const res = await postJSON("/wallet/send", {
        fromSecret: session.walletSecret,
        to,
        amount: parseFloat(amount),
      });

      alert("Success! TX: " + res.signature);
    } catch (err: any) {
      alert("Send error: " + err.message);
    }

    setLoading(false);
  }

  return (
    <S.PageContainer>
      <S.Box>
        <h1>Send SOL</h1>

        <input
          placeholder="Destination wallet"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          placeholder="Amount (SOL)"
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
