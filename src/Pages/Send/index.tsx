import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { Connection, PublicKey } from "@solana/web3.js";
import Navbar from "../../Components/Navbar";
import { ShieldCheck, Eye, EyeOff, RefreshCcw } from "lucide-react";
import { postUserBalance } from "../../services/api";

/* =====================================================
   PUBLIC KEY VALIDATION
===================================================== */
function isValidPubKey(pk: any): boolean {
  try {
    if (!pk) return false;
    if (typeof pk !== "string") return false;

    const clean = pk.trim();
    if (clean.length < 32 || clean.length > 50) return false;

    new PublicKey(clean);
    return true;
  } catch {
    return false;
  }
}

export default function SendPage() {
  const auth = useAuth();
  const { session } = useAuth();

  const walletAddress = session?.walletAddress ?? null;

  const [to, setTo] = useState("");
  const [visible, setVisible] = useState(true);

  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const [veilBalance, setVeilBalance] = useState(0);

  const [amount, setAmount] = useState("");
  const [token, setToken] = useState<"SOL" | "USDC">("SOL");
  const [error, setError] = useState("");

  // 🔥 BLOCKCHAIN BALANCES
  const [solBalance, setSolBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);

  const from = auth?.session?.walletAddress || "";
  const secretKey = auth?.session?.secretKey || "";

  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=1581ae46-832d-4d46-bc0c-007c6269d2d9"
  );

  /* =====================================================
     LOAD BALANCES (SOL + USDC)
  ===================================================== */
  async function loadBalances() {
    if (!from) return;

    try {
      const pubkey = new PublicKey(from);

      // SOL
      const lamports = await connection.getBalance(pubkey);
      setSolBalance(lamports / 1e9);

      // USDC
      const USDC_MINT = new PublicKey(
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      );

      const tokenAcc = await connection.getParsedTokenAccountsByOwner(pubkey, {
        mint: USDC_MINT,
      });

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

  useEffect(() => {
    loadBalances();
  }, [from]);

  /* =====================================================
       SOL (BACKEND)
  ===================================================== */
  async function loadBackendBalance() {
    try {
      if (!isValidPubKey(walletAddress)) {
        setBalance(0);
        setLoadingBalance(false);
        return;
      }

      const res = await postUserBalance(walletAddress.trim());
      setBalance(res.balance);
    } catch (err) {
      console.error("Error fetching balance:", err);
    } finally {
      setLoadingBalance(false);
    }
  }

  useEffect(() => {
    loadBackendBalance();
  }, [walletAddress]);

  /* =====================================================
       VEIL (BLOCKCHAIN)
  ===================================================== */
  async function loadVEIL() {
    try {
      if (!isValidPubKey(walletAddress)) {
        setVeilBalance(0);
        return;
      }

      const VEIL_MINT = new PublicKey(
        "VSKXrgwu5mtbdSZS7Au81p1RgLQupWwYXX1L2cWpump"
      );

      const tokenAccounts =
        await connection.getParsedTokenAccountsByOwner(
          new PublicKey(walletAddress.trim()),
          { mint: VEIL_MINT }
        );

      if (tokenAccounts.value.length === 0) {
        setVeilBalance(0);
        return;
      }

      const uiAmount =
        tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;

      setVeilBalance(uiAmount || 0);
    } catch (err) {
      console.error("Erro carregando saldo VEIL:", err);
    }
  }

  useEffect(() => {
    loadVEIL();
  }, [walletAddress]);

  /* =====================================================
     RELOAD BUTTON
  ===================================================== */
  function reloadBalances() {
    setLoadingBalance(true);
    loadBalances();
    loadBackendBalance();
    loadVEIL();
  }

  /* =====================================================
     50% | MAX BUTTONS
  ===================================================== */
  function handleQuickAmount(percent: 0.5 | 1) {
    const bal = token === "SOL" ? solBalance : usdcBalance;
    const value = percent === 1 ? bal : bal * 0.5;
    setAmount(value.toString());
  }

  /* =====================================================
     SEND FUNCTION
  ===================================================== */
  async function handleSend() {
    setError("");

    if (!secretKey || !from) return setError("Wallet not loaded.");
    if (!to) return setError("Invalid address.");
    if (!amount) return setError("Enter an amount.");

    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) return setError("Invalid amount.");

    if (token === "SOL") {
      const fee = 0.00001;
      if (amt + fee > solBalance) {
        return setError("Insufficient SOL. Leave some SOL for network fees.");
      }
    }

    if (token === "USDC") {
      if (amt > usdcBalance) {
        return setError("Insufficient USDC balance.");
      }
    }

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
      setAmount("");
    } catch (err: any) {
      setError(err.message || "Unexpected error.");
    }
  }

  /* =====================================================
     UI
  ===================================================== */
  return (
    <>
      <Navbar name="Send" />

      <S.PageContainer>
        {/* BALANCE CARD */}
        <S.BalanceCard>
          <S.BalanceHeader>
            <div className="left">
              <div className="iconBox">
                <ShieldCheck />
              </div>

              <div>
                <div className="title">Available Balance</div>
                <div className="subtitle">
                  Linked Account:{" "}
                  {walletAddress
                    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(
                        -4
                      )}`
                    : "No wallet connected"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={reloadBalances}
                style={{ background: "transparent", border: "none" }}
              >
                <RefreshCcw size={18} />
              </button>

              <S.PasswordVisibity onClick={() => setVisible(!visible)}>
                {visible ? <Eye /> : <EyeOff />}
              </S.PasswordVisibity>
            </div>
          </S.BalanceHeader>

          <S.BalanceValue>
            {visible
              ? loadingBalance
                ? "Loading..."
                : balance !== null
                ? balance.toFixed(4)
                : "0.0000"
              : "............"}
            <span className="currency"> SOL</span>
          </S.BalanceValue>

          <S.TokenMiniRow>
            <div className="tokenBox">
              <img
                src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                alt="usdc"
              />
              <span>{usdcBalance.toFixed(2)} USDC</span>
            </div>

            <div className="tokenBox">
              <img
                src="https://cryptologos.cc/logos/solana-sol-logo.png"
                alt="veil"
              />
              <span>{veilBalance.toFixed(2)} VEIL</span>
            </div>
          </S.TokenMiniRow>
        </S.BalanceCard>

        {/* FORM */}
        <S.Box>
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

            <S.AmountRow>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(",", "."))}
                placeholder={`0.00 ${token}`}
              />

              <div className="quick-actions">
                <button type="button" onClick={() => handleQuickAmount(0.5)}>
                  50%
                </button>
                <button type="button" onClick={() => handleQuickAmount(1)}>
                  MAX
                </button>
              </div>
            </S.AmountRow>
          </S.Field>

          {token !== "SOL" && (
            <p style={{ marginTop: 5, opacity: 0.8 }}>
              ⚠ USDC transfers require a small amount of SOL for fees.
            </p>
          )}

          {error && (
            <div style={{ color: "red", marginBottom: 10 }}>{error}</div>
          )}

          <S.SendButton onClick={handleSend}>Send</S.SendButton>
        </S.Box>
      </S.PageContainer>
    </>
  );
}
