// src/Pages/Send/index.tsx
import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../../styles";

export default function SendPage() {
  const auth = useAuth();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const from = auth?.user?.walletPubkey || "";
  const fromSecretKey = JSON.parse(localStorage.getItem("user_private_key") || "[]");

  async function handleSend() {
    setError("");

    try {
      const res = await fetch("https://node-veilfi-jtae.onrender.com/wallet/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fromSecretKey,
          to,
          amount: Number(amount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Send failed");
      }

      alert("Transaction sent: " + data.signature);

    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <S.PageContainer>
                  <S.NavBar>
                    <button onClick={() => window.history.back()}>← Back</button>
                    <h2>Deposit</h2>
                    <h2></h2>
                  </S.NavBar>
      <S.Box>
        <h2>Send</h2>
        <S.Field>
          <label>Destination</label>
          <input value={to} onChange={(e) => setTo(e.target.value)} />
        </S.Field>

        <S.Field>
          <label>Amount (SOL)</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(",", "."))}
          />
        </S.Field>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <PrimaryButton onClick={handleSend} className="primary big">
          Send
        </PrimaryButton>
      </S.Box>
    </S.PageContainer>
  );
}
