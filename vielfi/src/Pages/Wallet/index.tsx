import { useWalletStore } from "../../store/walletStore";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useNavigate } from "react-router-dom";

export function Wallet() {
  const { walletName, address, privateKey, seedPhrase, balance } = useWalletStore();
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <S.Container>
        <S.Card>
          <h1>Welcome</h1>
          <h2>{walletName}</h2>
          <S.Info>
            <strong>Balance:</strong>
            <p>{balance} ETH</p>
          </S.Info>
          <S.Info>
            <strong>Address:</strong>
            <p>{address}</p>
          </S.Info>

          <S.Info>
            <strong>Private Key:</strong>
            <p>{privateKey}</p>
          </S.Info>

          <S.Info>
            <strong>Seed Phrase:</strong>
            <p>{seedPhrase}</p>
          </S.Info>

          <PrimaryButton onClick={() => navigate("/deposit")}>
            Deposit →
          </PrimaryButton>
        </S.Card>
      </S.Container>

      <Footer />
    </>
  );
}
