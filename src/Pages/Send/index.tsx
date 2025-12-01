import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../context/Auth";
import { postJSON } from "../../services/api";

export function SendPage() {
  const { session } = useAuth();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  
  // NOVO: token selecionado
  const [token, setToken] = useState<"SOL" | "USDC" | "VEIL">("SOL");

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

    const normalizedAmount = Number(amount.replace(",", "."));

    if (isNaN(normalizedAmount) || normalizedAmount <= 0) {
      alert("Invalid amount format.");
      return;
    }

    setLoading(true);

    try {
      const res = await postJSON("/wallet/send", {
        secretKey: secret,
        recipient: to.trim(),
        amount: normalizedAmount,
        token                        // ★ envia o token para o backend
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
        <h1>Send</h1>

        <input
          placeholder="Destination wallet"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        {/* NOVO SELECT DE TOKEN */}
        <select
          value={token}
          onChange={(e) =>
            setToken(e.target.value as "SOL" | "USDC" | "VEIL")
          }
          style={{
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <option value="SOL">SOL</option>
          <option value="USDC">USDC</option>
          <option value="VEIL">VEIL</option>
        </select>

        <input
          placeholder={`Amount (${token})`}
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
