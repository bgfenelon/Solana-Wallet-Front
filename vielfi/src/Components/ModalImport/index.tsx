import { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { postJSON } from "../../services/api";
import { importAnyWallet } from "../../utils/walletImport";
import { useAuth } from "../../hooks/useAuth";

export default function ModalImport({ open, onClose }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const { refresh } = useAuth();

  if (!open) return null;

  async function handleImport() {


    try {
      importAnyWallet(input);

      await postJSON("/auth/import", { input });

      await refresh();

      window.location.href = "/wallet";
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Import failed");
    }
  }

  function copy() {
    navigator.clipboard.writeText(input);
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>Import Wallet (Solana)</h2>

        <label>Private Key / Seed Phrase</label>
        <S.TextArea
          placeholder="Paste your seed phrase or private key"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />



        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>
          <PrimaryButton onClick={handleImport}>Import →</PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
