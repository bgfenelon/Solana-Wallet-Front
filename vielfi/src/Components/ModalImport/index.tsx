import { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useWalletStore } from "../../store/walletStore";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

export function ModalImport({ open, onClose }) {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const setWallet = useWalletStore((s) => s.setWallet);

  if (!open) return null;

  const importWallet = () => {
    try {
      let wallet;

      if (data.trim().split(" ").length >= 12) {
        wallet = ethers.Wallet.fromPhrase(data.trim());
      } else {
        wallet = new ethers.Wallet(data.trim());
      }

      setWallet("Imported Wallet", wallet.privateKey, wallet.address, wallet.mnemonic?.phrase ?? "");
      navigate("/wallet");

    } catch {
      alert("Invalid private key or seed phrase.");
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>Import Wallet</h2>
        <p>Enter your private key or seed phrase:</p>

        <S.TextArea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="private key OR seed phrase"
        />

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>
          <PrimaryButton disabled={!data.trim()} onClick={importWallet}>
            Import →
          </PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
