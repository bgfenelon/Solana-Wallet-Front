import { useState, useMemo } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { ethers } from "ethers";
import { useWalletStore } from "../../store/walletStore";
import { useNavigate } from "react-router-dom";

export function ModalCreate({ open, onClose }) {
  if (!open) return null;

  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const setWallet = useWalletStore((s) => s.setWallet);

  // ❗ GERA APENAS UMA VEZ
  const wallet = useMemo(() => ethers.Wallet.createRandom(), []);

  const seed = wallet.mnemonic?.phrase ?? "";

  const copy = (text: string) => navigator.clipboard.writeText(text);

  const handleCreate = () => {
    if (!name.trim() || !checked) {
      setError(true);
      return;
    }

    setWallet(name, wallet.privateKey, wallet.address, seed);
    navigate("/wallet");
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()} error={error}>
        <h2>Create Wallet</h2>

        <S.Input
          placeholder="Wallet name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
          }}
          className={error && !name.trim() ? "error" : ""}
        />

        <h3>Seed Phrase</h3>

        <S.SeedBox>
          <p>{seed}</p>
          <button onClick={() => copy(seed)}>Copy</button>
        </S.SeedBox>

        <S.CheckRow className={error && !checked ? "error" : ""}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => {
              setChecked(!checked);
              setError(false);
            }}
          />
          <span>I confirm I have written down my seed phrase.</span>
        </S.CheckRow>

        {error && (
          <S.ErrorMsg>
            Please fill out all required fields before creating a wallet.
          </S.ErrorMsg>
        )}

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>

          <PrimaryButton onClick={handleCreate}>
            Create →
          </PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
