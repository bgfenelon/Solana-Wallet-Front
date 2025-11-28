// src/Pages/Wallet/index.tsx
import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import {
  Shield,
  Eye,
  EyeOff,
  TrendingUp,
  Download,
  ArrowRightLeft,
  Wallet,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const POLL_INTERVAL = 30_000; // 30 segundos
const MAX_RETRIES = 4;
const INITIAL_RETRY_DELAY = 500;

const inFlight = new Map<string, Promise<any>>();

async function rawFetchWithRetry(
  path: string,
  options = {},
  retries = MAX_RETRIES,
  retryDelay = INITIAL_RETRY_DELAY
) {
  const res = await fetch(`${API}${path}`, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (res.status === 429 && retries > 0) {
    const jitter = Math.floor(Math.random() * 200);
    await new Promise((r) => setTimeout(r, retryDelay + jitter));
    return rawFetchWithRetry(path, options, retries - 1, retryDelay * 2);
  }

  const text = await res.text().catch(() => "");
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {}

  if (!res.ok) {
    throw new Error(json?.error ?? json?.message ?? `HTTP ${res.status}`);
  }

  return json;
}

function requestSingle(key, path, options) {
  if (inFlight.has(key)) return inFlight.get(key);
  const p = rawFetchWithRetry(path, options)
    .then((r) => {
      inFlight.delete(key);
      return r;
    })
    .catch((err) => {
      inFlight.delete(key);
      throw err;
    });
  inFlight.set(key, p);
  return p;
}

function getJSON(path) {
  return requestSingle(`GET:${path}`, path, { method: "GET" });
}

function postJSON(path, body) {
  return requestSingle(`POST:${path}:${JSON.stringify(body)}`, path, {
    method: "POST",
    body,
  });
}

export default function WalletPage() {
  const auth = useAuth();

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [balanceSOL, setBalanceSOL] = useState<number | null>(null);
  const [tokens, setTokens] = useState([]);
  const [showTokens, setShowTokens] = useState(false);

  const mountedRef = useRef(true);
  const pollingRef = useRef(null);
  const isLoadingRef = useRef(false);

  async function loadOnce() {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      const session = await getJSON("/session/me");
      const pub = session?.user?.walletPubkey;
      if (!pub) return;

      const r = await postJSON("/user/balance", { userPubkey: pub });

      if (!mountedRef.current) return;

      setBalanceSOL(typeof r.solBalance === "number" ? r.solBalance : 0);
      setTokens(Array.isArray(r.tokens) ? r.tokens : []);
    } catch (err) {
      console.error("Wallet load error:", err);
    } finally {
      isLoadingRef.current = false;
    }
  }

  useEffect(() => {
    mountedRef.current = true;

    loadOnce();

    pollingRef.current = setInterval(loadOnce, POLL_INTERVAL);

    return () => {
      mountedRef.current = false;
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  return (
    <S.PageContainer className="dark">
      <S.Content>
        <S.Header>
          <div className="brand">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png"
              alt="logo"
            />
            <h1>Veilfi</h1>
          </div>
        </S.Header>

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
              <button onClick={() => setIsBalanceVisible((s) => !s)}>
                {isBalanceVisible ? <Eye className="eye" /> : <EyeOff className="eye" />}
              </button>
            </div>
          </S.BalanceHeader>

          <S.BalanceValue>
            {isBalanceVisible
              ? balanceSOL !== null
                ? balanceSOL.toFixed(4)
                : "…"
              : "****"}
            <span className="currency">SOL</span>
          </S.BalanceValue>

          <button
            onClick={() => loadOnce()}
            style={{
              marginTop: 14,
              background: "#9d4edd",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Atualizar agora
          </button>

          <div style={{ marginTop: 10, textAlign: "center" }}>
            <button
              onClick={() => setShowTokens((s) => !s)}
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
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <div>
                      <strong>{t.mint.slice(0, 6)}...</strong>
                    </div>
                    <div style={{ color: "#9d4edd" }}>{t.uiAmount ?? 0}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </S.BalanceCard>

        <S.ActionGrid>
          <S.ActionButton to="/send">
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
