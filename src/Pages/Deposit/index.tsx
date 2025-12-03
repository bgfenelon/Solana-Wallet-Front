import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import QRCode from "react-qr-code";
import { useAuth } from "../../context/Auth";
import { Coins, Copy, HandCoins, Shield } from "lucide-react";
import Navbar from "../../Components/Navbar";

/**
 * Deposit Page completo
 * - polling seguro a cada 30s
 * - retry/backoff para 429
 * - evita chamadas concorrentes
 */

const API = import.meta.env.VITE_API_URL ?? "https://node-veilfi-jtae.onrender.com";
const POLL_INTERVAL = 30_000;
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
    headers: { "Content-Type": "application/json" },
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
  } catch {}

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

export default function DepositPage(): React.ReactElement {

  const [coin, setCoin] = useState<"SOL" | "VEIL">("SOL")

  const { session, loading: authLoading } = useAuth();

  const walletAddress = session?.walletAddress ?? null;

  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const mountedRef = useRef(true);
  const isLoadingRef = useRef(false);
  const pollingRef = useRef<number | null>(null);

  // --------------------------------------
  // 🔥 COPY BUTTON (handleCopy + clicked)
  // --------------------------------------
  const [clicked, setClicked] = useState<boolean>(false);

  const handleCopy = (): void => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 2500);
  };
  // --------------------------------------

  async function loadOnce() {
    if (!walletAddress) return;
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setLoading(true);

    try {
      const res = await postJSON("/user/balance", {
        userPubkey: walletAddress,
      });

      if (!mountedRef.current) return;

      setBalance(typeof res?.balance === "number" ? res.balance : 0);
    } catch (err: any) {
      console.error("Error loading deposit balance:", err?.message ?? err);
    } finally {
      isLoadingRef.current = false;
      setLoading(false);
    }
  }

  useEffect(() => {
    mountedRef.current = true;

    if (walletAddress) loadOnce();

    pollingRef.current = window.setInterval(() => {
      if (!mountedRef.current || !walletAddress) return;
      loadOnce();
    }, POLL_INTERVAL);

    return () => {
      mountedRef.current = false;
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [walletAddress]);

  if (authLoading) {
    return (
      <S.PageContainer>
        <S.Box>Carregando carteira...</S.Box>
      </S.PageContainer>
    );
  }

  if (!walletAddress) {
    return (
      <S.PageContainer>
        <S.NavBar>
          <button onClick={() => window.history.back()}>← Back</button>
          <h2>Deposit</h2>
          <h2></h2>
        </S.NavBar>

        <S.Box>
          <h2>Nenhuma carteira conectada</h2>
          <p>Importe sua carteira para depositar SOL.</p>
        </S.Box>
      </S.PageContainer>
    );
  }

  return (
    <><Navbar name="Deposit" />
    <S.PageContainer>
      <S.Box>
        <p style={{ textAlign: "left", fontSize: "14px", fontWeight: "700" }}>Select your Wallet</p>
        <S.ButtonContainer>
          <S.CoinButton className={coin == "SOL" ? "selected" : ""} onClick={() => setCoin("SOL")}><Coins /> SOL</S.CoinButton>
          <S.CoinButton className={coin == "VEIL" ? "selected" : ""} onClick={() => setCoin("VEIL")}><Coins /> VEIL</S.CoinButton>
        </S.ButtonContainer>
        {coin == "SOL" ? (
          <>
            <S.QrWrapper>
              <S.QRCodeStyled value={walletAddress} />
            </S.QrWrapper>

            <S.CopyRow>
              <S.AddrBox>{walletAddress}</S.AddrBox>
              <S.CopyButton className="copy" onClick={handleCopy}>
                {clicked ? "Copied!" : (
                  <>
                    <Copy className="copy-icon" />
                    Copy
                  </>
                )}
              </S.CopyButton>
            </S.CopyRow>
          </>
        ) : (
          <>
            <S.ComingSoon>

              <S.ComingSoonTitle>Coming Soon</S.ComingSoonTitle>
              <S.CopyRow>

              </S.CopyRow>
            </S.ComingSoon>
          </>
        )}
      </S.Box>
      <S.Card>
        <S.IconContainer style={{ background: '#7b75ff4d' }}><Shield stroke="#7b75ff" /></S.IconContainer>
        <div className="fontDiv">
          <h6> Private Wallet </h6>
          <p>Deposits automatically transfer to your private wallet</p>
        </div>
      </S.Card>
      <S.Card>
        <S.IconContainer style={{ background: '#008f4a4d' }}><HandCoins stroke="green" /></S.IconContainer>
        <div className="fontDiv">
          <h6>Auto-Transfer</h6>
          <p>Deposits are credited quickly after confirmation.</p>
        </div>
      </S.Card>
    </S.PageContainer></>
  );
}
