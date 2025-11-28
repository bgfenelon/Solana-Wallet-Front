// src/Pages/Deposit/index.tsx
import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import QRCode from "react-qr-code";
import { useAuth } from "../../hooks/useAuth";

/**
 * Deposit Page completo
 * - polling seguro a cada 30s
 * - botão "Atualizar agora"
 * - retry/backoff para 429
 * - evita chamadas concorrentes
 *
 * Não depende de src/services/api; usa client interno para garantir comportamento robusto.
 */

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
const POLL_INTERVAL = 30_000; // 30 segundos
const MAX_RETRIES = 4;
const INITIAL_RETRY_DELAY = 500;

const inFlight = new Map<string, Promise<any>>();

async function rawFetchWithRetry(
  path: string,
  options: { method?: "GET" | "POST"; body?: any } = {},
  retries = MAX_RETRIES,
  retryDelay = INITIAL_RETRY_DELAY
) {
  const url = `${API}${path}`;
  const res = await fetch(url, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (res.status === 429 && retries > 0) {
    const jitter = Math.floor(Math.random() * 200);
    await new Promise((r) => setTimeout(r, retryDelay + jitter));
    return rawFetchWithRetry(path, options, retries - 1, retryDelay * 2);
  }

  const text = await res.text().catch(() => "");
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // ignore parse errors (non-JSON responses)
  }

  if (!res.ok) {
    const errMsg = json?.error ?? json?.message ?? `HTTP ${res.status}`;
    throw new Error(`${res.status} ${res.statusText}: ${errMsg}`);
  }

  return json;
}

function requestSingle(key: string, path: string, options?: any) {
  if (inFlight.has(key)) return inFlight.get(key)!;
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

function getJSON(path: string) {
  return requestSingle(`GET:${path}`, path, { method: "GET" });
}
function postJSON(path: string, body: any) {
  return requestSingle(`POST:${path}:${JSON.stringify(body)}`, path, {
    method: "POST",
    body,
  });
}

export default function DepositPage(): JSX.Element {
  const { walletAddress } = useAuth();

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);
  const isLoadingRef = useRef(false);
  const pollingRef = useRef<number | null>(null);

  // Carrega saldo via /session/me -> /user/balance
  async function loadOnce() {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setLoading(true);
    try {
      const session = await getJSON("/session/me");
      const pub = session?.user?.walletPubkey;
      if (!pub) {
        // sem sessão ativa; não altera balance
        return;
      }

      const res = await postJSON("/user/balance", { userPubkey: pub });
      if (!mountedRef.current) return;

      setBalance(typeof res?.solBalance === "number" ? res.solBalance : 0);
    } catch (err: any) {
      // Não limpar o balance em erros para evitar flicker quando houver 429/transientes
      console.error("Error loading deposit balance:", err?.message ?? err);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }

  useEffect(() => {
    mountedRef.current = true;

    // inicial
    loadOnce();

    // polling único
    pollingRef.current = window.setInterval(() => {
      if (!mountedRef.current) return;
      loadOnce();
    }, POLL_INTERVAL);

    return () => {
      mountedRef.current = false;
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.PageContainer>
      <S.Box>
        <h1>Deposit</h1>
        <p>Send SOL to your personal wallet address:</p>

        <S.QrWrapper>
          <QRCode value={walletAddress || "0"} size={180} />
        </S.QrWrapper>

        <S.AddrBox>{walletAddress || "—"}</S.AddrBox>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
          <button
            className="copy"
            onClick={() => {
              if (walletAddress) navigator.clipboard.writeText(walletAddress);
            }}
          >
            Copy Address
          </button>


        </div>

        <p style={{ marginTop: 10, opacity: 0.7 }}>
          The system will automatically detect new deposits (polls every 30s). Use "Atualizar agora" to force a check.
        </p>

        <h3 style={{ marginTop: 20 }}>
          Balance: <strong>{balance !== null ? balance.toFixed(4) + " SOL" : "—"}</strong>
        </h3>
        {/* TODO */}
                  <button
            className="refresh"
            onClick={() => loadOnce()}
            disabled={loading}
            title="Refresh balance now"
          >
            {loading ? "Updating..." : "Atualizar agora"}
          </button>
      </S.Box>
    </S.PageContainer>
  );
}
