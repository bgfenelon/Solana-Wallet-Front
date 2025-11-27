import React, { useEffect, useState } from "react";
import * as S from "./styles";
import {
  Shield,
  Eye,
  EyeOff,
  TrendingUp,
  Download,
  ArrowRightLeft,
  Wallet
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getJSON, postJSON } from "../../services/api";

export default function WalletPage() {
  const { walletAddress, loading, refresh } = useAuth();

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [balanceSOL, setBalanceSOL] = useState<number | null>(null);
  const [tokens, setTokens] = useState<any[]>([]);
  const [showTokens, setShowTokens] = useState(false);

  // ------------ CARREGAR SALDO (MESMA LÓGICA DO DEPOSIT) ----------------
  useEffect(() => {
    async function load() {
      try {
        const session = await getJSON("/session/me");

        if (!session.user?.walletPubkey) {
          console.error("No pubkey in session");
          return;
        }

        const res = await postJSON("/user/balance", {
          userPubkey: session.user.walletPubkey,
        });

        setBalanceSOL(res.solBalance ?? 0);
        setTokens(res.tokens ?? []);
      } catch (err) {
        console.error("Wallet error:", err);
      }
    }

    load();
    const int = setInterval(load, 10_000);
    return () => clearInterval(int);
  }, []);

  return (
    <S.PageContainer className="dark">
      <S.Content>
        <S.Header>
          <div className="brand">
            <img src="/logo.png" alt="logo" />
            <h1>Veilfi</h1>
          </div>
        </S.Header>

        {/* ---------------------- BALANCE CARD ---------------------- */}
        <S.BalanceCard>
          <S.BalanceHeader>
            <div className="left">
              <div className="iconBox">
                <Shield className="shield" />
              </div>
              <div>
                <div className="title">Shielded Balance</div>
                <div className="subtitle">Private funds</div>
              </div>
            </div>

            <div className="right">
              <button onClick={() => setIsBalanceVisible(!isBalanceVisible)}>
                {isBalanceVisible ? <Eye className="eye" /> : <EyeOff className="eye" />}
              </button>
            </div>
          </S.BalanceHeader>

          {/* VALOR DO SALDO */}
          <S.BalanceValue>
            {isBalanceVisible
              ? balanceSOL !== null
                ? balanceSOL.toFixed(4)
                : loading
                ? "…"
                : "0.0000"
              : "****"}
            <span className="currency">SOL</span>
          </S.BalanceValue>

          {/* Botão para mostrar tokens */}
          <div style={{ marginTop: 10, textAlign: "center" }}>
            <button
              onClick={() => setShowTokens(!showTokens)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#9d4edd",
                display: "flex",
                alignItems: "center",
                gap: 8,
                margin: "0 auto",
                fontSize: "0.95rem",
              }}
            >
              <Wallet size={18} />
              {showTokens ? "Hide tokens" : "Show tokens"}
            </button>
          </div>

          {/* LISTA DE TOKENS */}
          {showTokens && (
            <div style={{ marginTop: 15, padding: "10px 0" }}>
              {tokens.length === 0 ? (
                <p style={{ color: "#aaa", textAlign: "center" }}>
                  Nenhum token encontrado
                </p>
              ) : (
                tokens.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "8px 14px",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <strong>{t.mint.slice(0, 6)}...</strong>
                    </div>
                    <div style={{ color: "#9d4edd" }}>
                      {t.uiAmount ?? 0}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </S.BalanceCard>

        {/* ---------------------- ACTION BUTTONS ---------------------- */}
        <S.ActionGrid>
          <S.ActionButton to="/wallet">
            <S.ActionIcon className="purple">
              <TrendingUp />
            </S.ActionIcon>
            <div className="title">Send</div>
            <div className="subtitle">Transfer privately</div>
          </S.ActionButton>

          <S.ActionButton to="/swap">
            <S.ActionIcon className="purple">
              <ArrowRightLeft />
            </S.ActionIcon>
            <div className="title">Swap</div>
            <div className="subtitle">Exchange tokens</div>
          </S.ActionButton>

          <S.ActionButton to="/deposit">
            <S.ActionIcon className="purple">
              <Download />
            </S.ActionIcon>
            <div className="title">Receive</div>
            <div className="subtitle">Get securely</div>
          </S.ActionButton>
        </S.ActionGrid>
      </S.Content>
    </S.PageContainer>
  );
}
vei