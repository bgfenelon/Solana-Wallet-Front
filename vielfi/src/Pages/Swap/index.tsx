// src/Pages/Swap/index.tsx
import { useState } from "react";
import { postJSON } from "../../services/api";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";

export default function SwapPage() {
  const { user } = useAuth();
  const [inputToken, setInputToken] = useState<"SOL" | "USDT">("SOL");
  const [inputAmount, setInputAmount] = useState<number | "">("");
  const [quote, setQuote] = useState<any>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function getQuote() {
    setMessage(null);
    if (!inputAmount || Number(inputAmount) <= 0) return;
    setLoadingQuote(true);
    try {
      const res = await postJSON("/swap/quote", {
        inputToken,
        inputAmount: Number(inputAmount),
      });
      setQuote(res.quote);
    } catch (err: any) {
      console.error("Quote error", err);
      setMessage(err?.message || "Quote failed");
    } finally {
      setLoadingQuote(false);
    }
  }

  async function handleExecute() {
    setMessage(null);
    if (!user?.walletPubkey) {
      setMessage("No user wallet configured");
      return;
    }
    if (!quote) {
      setMessage("Get a quote first");
      return;
    }
    setExecuting(true);
    try {
      const res = await postJSON("/swap/execute", {
        userPubkey: user.walletPubkey,
        inputToken,
        inputAmount: Number(inputAmount),
      });
      setMessage(`Swap executed: tx ${res.tx} — received ${res.outputAmount}`);
      setQuote(null);
      setInputAmount("");
    } catch (err: any) {
      console.error("Execute error", err);
      setMessage(err?.message || "Execute failed");
    } finally {
      setExecuting(false);
    }
  }

  return (
    <S.Container>
      <S.Card>
        <S.Title>Local Swap (SOL / USDT → Pump)</S.Title>

        <S.Section>
          <S.Label>Input token</S.Label>
          <div style={{ display: "flex", gap: 8 }}>
            <S.TokenButton onClick={() => setInputToken("SOL")} active={inputToken === "SOL"}>SOL</S.TokenButton>
            <S.TokenButton onClick={() => setInputToken("USDT")} active={inputToken === "USDT"}>USDT</S.TokenButton>
          </div>
        </S.Section>

        <S.Section>
          <S.Label>Amount</S.Label>
          <S.Input type="number" value={inputAmount as any} onChange={(e) => setInputAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="0.00" />
        </S.Section>

        <S.Button disabled={loadingQuote || !inputAmount} onClick={getQuote}>
          {loadingQuote ? "Getting quote..." : "Get Quote"}
        </S.Button>

        {quote && (
          <S.QuoteBox>
            <div>Estimated output: <strong>{quote.outputAmount}</strong> pump tokens</div>
            <div>Price source: {quote.priceSource}</div>
          </S.QuoteBox>
        )}

        <S.Button disabled={executing || !quote} onClick={handleExecute}>
          {executing ? "Executing swap..." : "Execute Swap"}
        </S.Button>

        {message && <S.Message>{message}</S.Message>}
      </S.Card>
    </S.Container>
  );
}
