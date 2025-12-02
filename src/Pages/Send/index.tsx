import React, { useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";

export default function SendPage() {
  const auth = useAuth();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<"SOL" | "USDC">("SOL");
  const [error, setError] = useState("");

  const from = auth?.session?.walletAddress || "";
  const secretKey = auth?.session?.secretKey || "";

  async function handleSend() {
    setError("");

    console.log("=== FRONT DEBUG ===");
    console.log("secretKey (type):", typeof secretKey, secretKey);
    console.log("token:", token);
    console.log("recipient:", to);
    console.log("amount:", amount);

    if (!secretKey || !from) {
      return setError("Wallet not loaded.");
    }

    if (!to) return setError("Invalid address.");
    if (!amount) return setError("Enter amount.");

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return setError("Invalid amount.");

    try {
      const res = await fetch(
        "https://node-veilfi-jtae.onrender.com/wallet/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secretKey: String(secretKey),
            recipient: to.trim(),
            amount: amt,
            token: String(token), // 🔥 sempre string
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Send failed");

      alert("Transaction sent: " + data.signature);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <S.PageContainer>
            <S.NavBar>
              <button onClick={() => window.history.back()}>← Back</button>
              <h2>Swap</h2>
            </S.NavBar>
      <S.Box>
        <h2>Send</h2>

        <S.Field>
          <label>From</label>
          <div className="mono">{from}</div>
        </S.Field>

        <S.Field>
          <label>Destination</label>
          <input value={to} onChange={(e) => setTo(e.target.value)} />
        </S.Field>

        <S.Field>
          <label>Token</label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value as any)}
          >
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
          </select>
        </S.Field>

        <S.Field>
          <label>Amount ({token})</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(",", "."))}
          />
        </S.Field>

        {token !== "SOL" && (
          <p style={{ marginTop: 5, opacity: 0.8 }}>
            ⚠ USDC transfers require a small amount of SOL for fees.
          </p>
        )}

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button onClick={handleSend}>Send</button>
      </S.Box>
    </S.PageContainer>
  );
}
