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
      // Validação offline da chave/seed
      const wallet = importAnyWallet(input);

      // Enviar para o back-end no formato correto
      const res = await postJSON("/auth/import", {
        input: wallet.privateKey, // já vem como JSON.stringify([...])
      });

      // Armazenar localmente (opcional, desenvolvimento)
      if (res?.secretKey) {
        localStorage.setItem("user_private_key", JSON.stringify(res.secretKey));
      }
      if (res?.walletAddress || res?.walletPubkey) {
        localStorage.setItem("user_public_key", res.walletAddress || res.walletPubkey);
      }

      onClose();
      window.location.href = "/wallet";
    } catch (err: any) {
      setError(err?.message || "Falha ao importar carteira.");
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
