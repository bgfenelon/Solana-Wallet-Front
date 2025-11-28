import React, { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { importAnyWallet } from "../../utils/walletImport";
import { postJSON } from "../../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalImport({ open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleImport() {
    setError(null);
    setLoading(true);

    try {
      // valida offline
      const wallet = importAnyWallet(input);

      // ENVIO CORRETO para o backend
      const res = await postJSON("/auth/import", { mnemonic: input });

      // salva localmente (apenas desenvolvimento)
      if (res?.secretKey) {
        localStorage.setItem("user_private_key", JSON.stringify(res.secretKey));
      }
      if (res?.walletAddress) {
        localStorage.setItem("user_public_key", res.walletAddress);
      }

      onClose();
      window.location.href = "/wallet";

    } catch (err: any) {
      setError(err?.message || "Import failed");
    } finally {
      setLoading(false);
    }
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
          <S.SecondaryButton onClick={onClose} disabled={loading}>
            Cancel
          </S.SecondaryButton>

          <PrimaryButton onClick={handleImport} disabled={loading}>
            {loading ? "Importing..." : "Import →"}
          </PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
