import React, { useEffect, useState } from "react";
import * as S from "./styles";
import {
  ArrowRightLeft,
  Eye,
  EyeOff,
  Send,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useAuth } from "../../context/Auth";
import { postUserBalance } from "../../services/api";
import { PasswordVisibity } from "./styles";
import { Connection, PublicKey } from "@solana/web3.js";

export default function WalletPage() {
  const { session } = useAuth();
  const walletAddress = session?.walletAddress ?? null;

  // BALANCE
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  // VISIBILITY
  const [visible, setVisible] = useState(true);

  // HISTORY
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // RPC
  const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=1581ae46-832d-4d46-bc0c-007c6269d2d9");

  /* ============================
       1 — FETCH BALANCE API
     ============================ */
  useEffect(() => {
    async function fetchBalance() {
      try {
        if (!walletAddress || walletAddress.length < 20) {
          console.warn("Invalid wallet address:", walletAddress);
          setLoadingBalance(false);
          return;
        }

        const cleanAddress = walletAddress.trim();
        const res = await postUserBalance(cleanAddress);

        setBalance(res.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
      } finally {
        setLoadingBalance(false);
      }
    }

    fetchBalance();
  }, [walletAddress]);

  /* ============================
       2 — FETCH HISTORY
     ============================ */
  useEffect(() => {
    async function loadTransactions() {
      try {
        if (!walletAddress || walletAddress.length < 20) {
          console.warn("Invalid wallet for history.");
          setLoadingHistory(false);
          return;
        }

        const pubkey = new PublicKey(walletAddress);

        const signatures = await connection.getSignaturesForAddress(pubkey, {
          limit: 10,
        });

        const txs = [];

        for (const sig of signatures) {
          const tx = await connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0,
          });

          if (!tx || !tx.meta) continue;

          const pre = tx.meta.preBalances;
          const post = tx.meta.postBalances;

          const accountIndex = tx.transaction.message.accountKeys.findIndex(
            (k) => k.toBase58() === walletAddress
          );

          if (accountIndex === -1) continue;

          const diffLamports = post[accountIndex] - pre[accountIndex];
          const diffSol = diffLamports / 1_000_000_000;

          txs.push({
            signature: sig.signature,
            slot: sig.slot,
            time: sig.blockTime,
            status: sig.err ? "Failed" : "Success",
            amount: diffSol,
            direction: diffSol > 0 ? "received" : "sent",
          });
        }

        setHistory(txs);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoadingHistory(false);
      }
    }

    loadTransactions();
  }, [walletAddress]);

  return (
    <>
      {/* HEADER */}
      <S.Header>
        <div className="brand">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png"
            alt="Logo"
          />
          <h1>Veilfi</h1>
        </div>
      </S.Header>

      <S.PageContainer>
        <S.Content>
          {/* ============================================================== */}
          {/*                           BALANCE                             */}
          {/* ============================================================== */}

          <S.BalanceCard>
            <S.BalanceHeader>
              <div className="left">
                <div className="iconBox">
                  <ShieldCheck className="shield" />
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

              <PasswordVisibity onClick={() => setVisible(!visible)}>
                {visible ? <Eye /> : <EyeOff />}
              </PasswordVisibity>
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
          </S.BalanceCard>

          {/* ============================================================== */}
          {/*                            BUTTONS                            */}
          {/* ============================================================== */}

          <S.ActionGrid>
            <S.ActionButton to="/deposit">
              <S.ActionIcon className="purple">
                <Wallet />
              </S.ActionIcon>
              <div className="title">Deposit</div>
              <div className="subtitle">Send SOL to your account</div>
            </S.ActionButton>

            <S.ActionButton to="/send">
              <S.ActionIcon className="purple">
                <Send />
              </S.ActionIcon>
              <div className="title">Send</div>
              <div className="subtitle">Transfer SOL</div>
            </S.ActionButton>

            <S.ActionButton to="/swap">
              <S.ActionIcon className="purple">
                <ArrowRightLeft />
              </S.ActionIcon>
              <div className="title">Swap</div>
              <div className="subtitle">Exchange for VEIL</div>
            </S.ActionButton>
          </S.ActionGrid>

          {/* ============================================================== */}
          {/*                        TRANSACTION HISTORY                    */}
          {/* ============================================================== */}

          <S.PaymentHistory style={{ marginTop: "40px", color: "white" }}>
          <S.BalanceCard>

<S.PaymentHeader>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "12px" }}>
              Latest Transactions
            </h3>
            <S.SeeMore to={"/paymentHistory"}>See more {" ->"}</S.SeeMore>
</S.PaymentHeader>

            {loadingHistory && <p>Loading...</p>}

            {!loadingHistory && history.length === 0 && (
              <p>No transactions found.</p>
            )}

            {history.map((tx, i) =>
              i < 5 ? (
                <div
                  key={i}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p>
                    <strong>Status:</strong> {tx.status}
                  </p>

                  <p>
                    <strong>Transaction type:</strong>{" "}
                    {tx.direction === "received" ? "Received" : "Sent"}
                  </p>

                  <p>
                    <strong>Amount:</strong>{" "}
                    {tx.amount > 0
                      ? `+${tx.amount.toFixed(4)} SOL`
                      : `${tx.amount.toFixed(4)} SOL`}
                  </p>

                  {tx.time && (
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(tx.time * 1000).toLocaleString()}
                    </p>
                  )}
                </div>
              ) : null
            )}
                      </S.BalanceCard>

          </S.PaymentHistory>
        </S.Content>
      </S.PageContainer>
    </>
  );
}
