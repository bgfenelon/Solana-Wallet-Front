import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/Auth";
import { postUserBalance } from "../../services/api";

export default function WalletPage() {
  const { session } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchBalance() {
    try {
      // Garantir que existe sessão e endereço válido
      if (!session?.walletAddress || session.walletAddress.length < 20) {
        console.warn("Endereço de carteira inválido:", session?.walletAddress);
        setLoading(false);
        return;
      }

      const userPubkey = session.walletAddress.trim();

      const res = await postUserBalance(userPubkey);
      setBalance(res.balance);
    } catch (err) {
      console.error("Erro ao buscar saldo:", err);
    } finally {
      setLoading(false);
    }
  }

  fetchBalance();
}, [session]);


  const walletAddress = session?.walletAddress ?? null;

  return (
    <S.PageContainer>
      <S.Content>

        <S.Header>
          <div className="brand">
            <img src="/icon.png" alt="Logo" />
            <h1>Veilfi Wallet</h1>
          </div>
        </S.Header>

        <S.BalanceCard>
          <S.BalanceHeader>
            <div className="left">
              <div className="iconBox">
                <ShieldCheck className="shield" />
              </div>

              <div>
                <div className="title">Saldo disponível</div>

                <div className="subtitle">
                  Conta vinculada:{" "}
                  {walletAddress
                    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
                    : "Nenhuma carteira"}
                </div>
              </div>
            </div>
          </S.BalanceHeader>

          <S.BalanceValue>
            {loading
              ? "Carregando..."
              : balance !== null
              ? balance.toFixed(4)
              : "0.0000"}
            <span className="currency"> SOL</span>
          </S.BalanceValue>
        </S.BalanceCard>

        <S.ActionGrid>
          <S.ActionButton to="/deposit">
            <S.ActionIcon className="purple">📥</S.ActionIcon>
            <div className="title">Depositar</div>
            <div className="subtitle">Enviar SOL para sua conta</div>
          </S.ActionButton>

          <S.ActionButton to="/send">
            <S.ActionIcon className="purple">📤</S.ActionIcon>
            <div className="title">Enviar</div>
            <div className="subtitle">Transferir SOL</div>
          </S.ActionButton>

          <S.ActionButton to="/swap">
            <S.ActionIcon className="purple">🔄</S.ActionIcon>
            <div className="title">Swap</div>
            <div className="subtitle">Trocar por VEIL</div>
          </S.ActionButton>
        </S.ActionGrid>

      </S.Content>
    </S.PageContainer>
  );
}
