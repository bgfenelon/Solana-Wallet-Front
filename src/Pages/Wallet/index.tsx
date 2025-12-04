import React, { useEffect, useState } from "react";
import * as S from "./styles";
import {
  ArrowDownLeft,
  ArrowRightLeft,
  ArrowUpLeft,
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
import { useNavigate } from "react-router-dom";

/* =====================================================
   VALIDAÇÃO DE PUBLICKEY
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

export default function WalletPage() {
  const { session } = useAuth();
  const walletAddress = session?.walletAddress ?? null;

  const [check, setCheck] = useState(false);

  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  const [usdtBalance, setUsdtBalance] = useState(0); // agora USDC
  const [veilBalance, setVeilBalance] = useState(0);

  const [visible, setVisible] = useState(true);

  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=1581ae46-832d-4d46-bc0c-007c6269d2d9"
  );

  const navigate = useNavigate();

  /* =====================================================
       1 — SOL BALANCE
===================================================== */
  useEffect(() => {
    async function fetchBalance() {
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

    fetchBalance();
  }, [walletAddress]);

  /* =====================================================
       2 — USDC BALANCE
===================================================== */
  useEffect(() => {
    async function loadUSDC() {
      try {
        if (!isValidPubKey(walletAddress)) {
          setUsdtBalance(0);
          return;
        }

        const USDC_MINT = new PublicKey(
          "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        );

        const tokenAccounts =
          await connection.getParsedTokenAccountsByOwner(
            new PublicKey(walletAddress.trim()),
            { mint: USDC_MINT }
          );

        if (tokenAccounts.value.length === 0) {
          setUsdtBalance(0);
          return;
        }

        const uiAmount =
          tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;

        setUsdtBalance(uiAmount || 0);
      } catch (err) {
        console.error("Erro carregando saldo USDC:", err);
      }
    }

    loadUSDC();
  }, [walletAddress]);

  /* =====================================================
       3 — VEIL BALANCE
===================================================== */
  useEffect(() => {
    async function loadVEIL() {
      try {
        if (!isValidPubKey(walletAddress)) {
          setVeilBalance(0);
          return;
        }

        const VEIL_MINT = new PublicKey(
          "7CVaSUZJanCjcK3jZc87eF2iQkcesDF7c98titi8pump"
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

    loadVEIL();
  }, [walletAddress]);

  /* =====================================================
     4 — TRANSACTIONS HISTORY (SOL + qualquer SPL)
===================================================== */
  useEffect(() => {
    async function loadTransactions() {
      try {
        if (!isValidPubKey(walletAddress)) {
          setHistory([]);
          setLoadingHistory(false);
          return;
        }

        const owner = new PublicKey(walletAddress.trim());

        const signatures = await connection.getSignaturesForAddress(owner, {
          limit: 20,
        });

        const txList: any[] = [];

        for (const s of signatures) {
          const tx = await connection.getTransaction(s.signature, {
            maxSupportedTransactionVersion: 0,
          });

          if (!tx || !tx.meta) continue;

          const preSol = tx.meta.preBalances;
          const postSol = tx.meta.postBalances;

          const keys = tx.transaction.message.getAccountKeys();
          const staticKeys = keys.staticAccountKeys;

          const index = staticKeys.findIndex(
            (k) => k.toBase58() === walletAddress
          );
          if (index === -1) continue;

          let items: any[] = [];

          // SOL
          const lamportsDiff = postSol[index] - preSol[index];
          if (lamportsDiff !== 0) {
            items.push({
              mint: "SOL",
              amount: lamportsDiff / 1e9,
              direction: lamportsDiff > 0 ? "received" : "sent",
            });
          }

          // SPL tokens
          const preTokens = tx.meta.preTokenBalances || [];
          const postTokens = tx.meta.postTokenBalances || [];

          for (const pre of preTokens) {
            const ownerMatch =
              pre.owner?.toLowerCase() === walletAddress.toLowerCase();
            if (!ownerMatch) continue;

            const post = postTokens.find(
              (p) => p.mint === pre.mint && p.owner === pre.owner
            );
            if (!post) continue;

            const before = Number(pre.uiTokenAmount.uiAmount || 0);
            const after = Number(post.uiTokenAmount.uiAmount || 0);
            const diff = after - before;

            if (diff !== 0) {
              items.push({
                mint: pre.mint,
                amount: diff,
                direction: diff > 0 ? "received" : "sent",
              });
            }
          }

          if (items.length > 0) {
            txList.push({
              signature: s.signature,
              slot: s.slot,
              time: tx.blockTime,
              status: tx.meta.err ? "Failed" : "Success",
              changes: items,
            });
          }
        }

        setHistory(txList);
      } catch (err) {
        console.error("ERROR HISTORY:", err);
      } finally {
        setLoadingHistory(false);
      }
    }

    loadTransactions();
  }, [walletAddress]);

  /* =====================================================
       RENDER
===================================================== */
function formatAmount(amount: number, decimals = 9) {
  if (!amount) return "0";

  // Remove notação científica
  const fixed = amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: false,
  });

  return fixed;
}

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
          {/* BALANCE CARD */}
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
                      ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
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

            {/* MINI TOKEN BOX */}
            <S.TokenMiniRow>
              {/* USDC */}
              <div className="tokenBox">
                <img
                  src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
                  alt="usdc"
                />
                <span>{usdtBalance.toFixed(2)} USDC</span>
              </div>

              {/* VEIL */}
              <div className="tokenBox">
                <img
                  src="https://cryptologos.cc/logos/solana-sol-logo.png"
                  alt="veil"
                />
                <span>{veilBalance.toFixed(2)} VEIL</span>
              </div>
            </S.TokenMiniRow>
          </S.BalanceCard>

          {/* SWAP SECTION */}
          <S.ActionGrid>
            <S.SwapButton onClick={() => navigate("/swap")}>
              <S.ActionIcon className="grid-one">
                <ArrowRightLeft />
              </S.ActionIcon>
              <div className="title">{check ? "Coming Soon " : ""}Swap</div>
              <div className="subtitle">Exchange for SOL OR USDC</div>
            </S.SwapButton>

            <S.SwapButton onClick={() => navigate("/wallet")}>
              <S.ActionIcon className="grid-one">
                <ArrowRightLeft />
              </S.ActionIcon>
              <div className="title">
                {check ? "Coming Soon " : ""}Coming soon: Swap For Veil
              </div>
              <div className="subtitle">Exchange for VEIL</div>
            </S.SwapButton>
          </S.ActionGrid>

          {/* BUTTONS */}
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
          </S.ActionGrid>

          {/* HISTORY */}
{/* HISTORY — ESTILO NOTIFICAÇÃO FLEX */}
<S.PaymentHistory style={{ marginTop: "40px", color: "white" }}>
  <S.BalanceCard>
    <S.PaymentHeader>
      <S.TittleHistoric>Latest Transactions</S.TittleHistoric>
    </S.PaymentHeader>

    {loadingHistory && <p>Loading...</p>}
    {!loadingHistory && history.length === 0 && (
      <S.Paragraph>No transactions found.</S.Paragraph>
    )}

    {history.slice(0, 5).map((tx, i) => (
      <React.Fragment key={i}>
        {tx.changes.map((c: any, j: number) => (
          <S.NotificationItem key={j}>
            
            {/* ÍCONE */}
            <S.NotificationIcon type={c.direction}>
              {c.direction === "received" ? <  ArrowDownLeft/> : < ArrowUpLeft />}
            </S.NotificationIcon>

            {/* INFO */}
            <S.NotificationInfo>
              <div className="title">
                {c.direction === "received" ? "Received " : "Sent "}
                {c.mint === "SOL" ? "SOL" : c.mint}
              </div>

              <div className="subtitle">
                {c.amount > 0 ? `+${formatAmount(c.amount)}` : formatAmount(c.amount)}
              </div>

              {tx.time && (
                <div className="time">
                  {new Date(tx.time * 1000).toLocaleString()}
                </div>
              )}
            </S.NotificationInfo>

          </S.NotificationItem>
        ))}
      </React.Fragment>
    ))}
  </S.BalanceCard>
</S.PaymentHistory>

        </S.Content>
      </S.PageContainer>
    </>
  );
}
