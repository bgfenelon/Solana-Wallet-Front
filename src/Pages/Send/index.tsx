import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { Connection, PublicKey } from "@solana/web3.js";

export default function SendPage() {
  const auth = useAuth();

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<"SOL" | "USDC">("SOL");
  const [error, setError] = useState("");

  // 🔥 BALANCES
  const [solBalance, setSolBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);

  const from = auth?.session?.walletAddress || "";
  const secretKey = auth?.session?.secretKey || "";

  /* =====================================================
     LOAD BALANCES (SOL + USDC)
  ===================================================== */
  useEffect(() => {
    if (!from) return;

    const connection = new Connection(
      "https://mainnet.helius-rpc.com/?api-key=1581ae46-832d-4d46-bc0c-007c6269d2d9"
    );

    async function loadBalances() {
      try {
        const pubkey = new PublicKey(from);

        // SOL BALANCE
        const lamports = await connection.getBalance(pubkey);
        setSolBalance(lamports / 1e9);

        // USDC BALANCE
        const USDC_MINT = new PublicKey(
          "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        );

        const tokenAcc = await connection.getParsedTokenAccountsByOwner(
          pubkey,
          { mint: USDC_MINT }
        );

        if (tokenAcc.value.length === 0) {
          setUsdcBalance(0);
        } else {
          const amt =
            tokenAcc.value[0].account.data.parsed.info.tokenAmount.uiAmount;
          setUsdcBalance(amt || 0);
        }
      } catch (err) {
        console.log("ERROR LOADING BALANCES:", err);
      }
    }

    loadBalances();
  }, [from]);

  /* =====================================================
     SEND FUNCTION — WITH IMPROVED FEEDBACK
  ===================================================== */
  async function handleSend() {
    setError("");

    if (!secretKey || !from) {
      return setError("Wallet not loaded.");
    }

    if (!to) return setError("Invalid address.");
    if (!amount) return setError("Enter an amount.");

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return setError("Invalid amount.");

    // ===============================
    // BALANCE CHECKS
    // ===============================
    if (token === "SOL") {
      const fee = 0.00001; // safe network fee estimate

      if (amt + fee > solBalance) {
        return setError("Insufficient SOL. Leave some SOL for network fees.");
      }
    }

    if (token === "USDC") {
      if (amt > usdcBalance) {
        return setError("Insufficient USDC balance.");
      }
    }

    // API REQUEST
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
            token: String(token),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transaction failed.");

      alert("Transaction sent: " + data.signature);
    } catch (err: any) {
      setError(err.message || "Unexpected error.");
    }
  }

  /* =====================================================
     BALANCE BOX UI
  ===================================================== */
  function renderBalanceBox() {
    const balance = token === "SOL" ? solBalance : usdcBalance;

    const formatted =
      token === "SOL"
        ? balance.toFixed(4) + " SOL"
        : balance.toFixed(2) + " USDC";

    return (
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(157,78,221,0.35)",
          padding: "12px",
          borderRadius: "12px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          fontSize: "15px",
        }}
      >
        <span>{formatted}</span>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            style={{
              padding: "6px 10px",
              background: "rgba(157,78,221,0.25)",
              borderRadius: "8px",
              border: "1px solid rgba(157,78,221,0.4)",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setAmount((balance * 0.5).toString())}
          >
            50%
          </button>

          <button
            style={{
              padding: "6px 10px",
              background: "rgba(157,78,221,0.25)",
              borderRadius: "8px",
              border: "1px solid rgba(157,78,221,0.4)",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setAmount(balance.toString())}
          >
            100%
          </button>
        </div>
      </div>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <S.PageContainer>
      <S.NavBar>
        <button onClick={() => window.history.back()}>← Back</button>
        <h2>Send</h2>
        <h2></h2>
      </S.NavBar>

      <S.Box>
        <h2>Send</h2>

        <S.Field>
          <label>From</label>
          <S.From className="mono">{from}</S.From>
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

          {renderBalanceBox()}

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

        {error && (
          <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
        )}

        <button onClick={handleSend}>Send</button>
      </S.Box>
    </S.PageContainer>
  );
}
