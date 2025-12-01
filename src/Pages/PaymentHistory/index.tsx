import React, { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as S from "./styles"
import { useAuth } from "../../context/Auth";



export default function TransactionsPage() {

    const { session } = useAuth();
    const walletAddress = session?.walletAddress ?? null;
  const [history, setHistory] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const connection = new Connection(
    "https://mainnet.helius-rpc.com/?api-key=1581ae46-832d-4d46-bc0c-007c6269d2d9"
  );

  useEffect(() => {
    async function loadHistory() {
      try {
        const pubkey = new PublicKey(walletAddress);

        const signatures = await connection.getSignaturesForAddress(pubkey, {
          limit: 50,
        });

        const txs = [];

        for (const sig of signatures) {
          const tx = await connection.getTransaction(sig.signature, {
            maxSupportedTransactionVersion: 0,
          });

          if (!tx || !tx.meta) continue;

          const pre = tx.meta.preBalances;
          const post = tx.meta.postBalances;

          // MessageV0 doesn't expose an `accountKeys` property directly — use getAccountKeys()
          // MessageAccountKeys might not be a plain array — ensure we convert to an array
          const accountKeys = Array.from(tx.transaction.message.getAccountKeys() as any);
          const index = accountKeys.findIndex((k: any) => k.toBase58() === walletAddress);

          if (index === -1) continue;

          const diffLamports = post[index] - pre[index];
          const diffSol = diffLamports / 1_000_000_000;

          txs.push({
            signature: sig.signature,
            slot: sig.slot,
            time: sig.blockTime,
            status: sig.err ? "Failed" : "Success",
            amount: diffSol,
            type: diffSol > 0 ? "received" : "sent",
          });
        }

        setHistory(txs);
        setFiltered(txs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [walletAddress]);

  // FILTER + SEARCH
  useEffect(() => {
    let list = [...history];

    if (filter !== "all") {
      list = list.filter((tx) => tx.type === filter);
    }

    if (search.trim() !== "") {
      list = list.filter((tx) =>
        tx.signature.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(list);
  }, [search, filter, history]);

  return (
    <S.PageContainer>

      <S.NavBar>
        <button onClick={() => window.history.back()}>← Back</button>
        <h2>Payment History</h2>
      </S.NavBar>

      <S.SearchRow>
        <S.SearchInput
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <S.FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Transactions</option>
          <option value="received">Received</option>
          <option value="sent">Sent</option>
        </S.FilterSelect>
      </S.SearchRow>

      <S.ListContainer>
        {loading && <p>Loading...</p>}

        {!loading && filtered.length === 0 && (
          <S.Empty>No transactions found</S.Empty>
        )}

        {filtered.map((tx, i) => (
          <S.TransactionCard key={i}>
            <div className="row">
              <span className={`type ${tx.type}`}>
                {tx.type === "received" ? "Received" : "Sent"}
              </span>
              <span className="amount">
                {tx.amount > 0 ? "+" : ""}
                {tx.amount.toFixed(4)} SOL
              </span>
            </div>

            <div className="row small">
              <span className="status">{tx.status}</span>
              {tx.time && (
                <span className="date">
                  {new Date(tx.time * 1000).toLocaleString()}
                </span>
              )}
            </div>

            <div className="signature">
              {tx.signature.slice(0, 20)}...
            </div>
          </S.TransactionCard>
        ))}
      </S.ListContainer>
    </S.PageContainer>
  );
}
