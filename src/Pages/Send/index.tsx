import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";

export function SendPage() {
  const { session } = useAuth();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    const secret = session?.secretKey;
    const pubkey = session?.walletAddress;

    if (!secret || !pubkey) {
      alert("Wallet not loaded.");
      return;
    }

    if (!to) {
      alert("Invalid recipient address.");
      return;
    }

    if (!amount) {
      alert("Enter an amount.");
      return;
    }

    // permite o usuário digitar "0,1"
    const normalizedAmount = Number(amount.replace(",", "."));

    if (isNaN(normalizedAmount) || normalizedAmount <= 0) {
      alert("Invalid amount format.");
      return;
    }

    setLoading(true);

    try {
      const res = await postJSON("/wallet/send", {
        secretKey: secret,       // ✔ backend usa este
        recipient: to.trim(),    // ✔ wallet destino
        amount: normalizedAmount // ✔ sempre número válido
      });

      if (res?.error) {
        alert("Error: " + res.error);
      } else {
        alert("Sent! Signature: " + res.signature);
      }
    } catch (err: any) {
      console.error("SEND ERROR:", err);
      alert("Error sending: " + err.message);
    }

    setLoading(false);
  }

  return (
    <S.PageContainer>
              <S.NavBar>
                <button onClick={() => window.history.back()}>← Back</button>
                <h2>Deposit</h2>
                <h2></h2>
              </S.NavBar>
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
