import React, { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { importAnyWallet } from "../../utils/walletImport";
import { postJSON } from "../../services/api";
import { useAuth } from "../../context/Auth";   // ⭐ FIX

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalImport({ open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { saveWallet } = useAuth();     // ⭐ FIX

  if (!open) return null;

  async function handleImport() {
    setError(null);
    setLoading(true);

    try {
      // Validar chave/seed offline
      const wallet = importAnyWallet(input);

      // Consultar backend
      const res = await postJSON("/auth/import", {
        input: wallet.privateKey,
      });

      // Dados reais da wallet vinda do backend/validação
      const pubkey =
        res.walletAddress || res.walletPubkey || wallet.publicKey;

      const privkey =
        res.secretKey || wallet.privateKey;

      // ⭐ FIX — SALVAR NO AUTH CONTEXT CORRETAMENTE
      saveWallet({
        walletAddress: pubkey,
        secretKey: Array.isArray(privkey)
          ? privkey
          : JSON.parse(privkey),
      });

      // ⭐ REMOVER salvamento manual (desnecessário e causa bugs)
      // localStorage.setItem("user_private_key", JSON.stringify(res.secretKey));
      // localStorage.setItem("user_public_key", pubkey);

      onClose();
      window.location.href = "/wallet";

    } catch (err: any) {
      console.error(err);
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
