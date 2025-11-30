import React, { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { importAnyWallet } from "../../utils/walletImport";
import { postJSON } from "../../services/api";
import { useAuth } from "../../context/Auth";

interface Props {
  open: boolean;
  onClose: () => void;
}

// 🔍 Validação simples para evitar inputs inválidos antes do importAnyWallet
function isLikelyValidInput(text: string) {
  const trimmed = text.trim();

  // 1) Seed phrase (mínimo 12 palavras)
  const words = trimmed.split(/\s+/);
  if (words.length >= 12) return true;

  // 2) JSON array private key
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) return true;

  // 3) Base58 private key longa
  if (trimmed.length > 40 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(trimmed)) return true;

  return false;
}

export default function ModalImport({ open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { saveWallet } = useAuth();

  async function handleImport() {
    setError(null);

    // 🚨 Validação inicial para evitar erros do importAnyWallet
    if (!isLikelyValidInput(input)) {
      setError(
        "Formato inválido. Use:\n• Seed phrase (12–24 palavras)\n• Private key base58\n• Private key em JSON array"
      );
      return;
    }

    setLoading(true);

    try {
      // 1) Validar chave/seed e gerar keypair
      const wallet = importAnyWallet(input);

      if (!wallet || !wallet.publicKey) {
        throw new Error("Falha ao gerar chave pública. Verifique o formato.");
      }

      const publicKey = wallet.publicKey;
      const secretKey: string | number[] = wallet.privateKey;

      if (!publicKey || publicKey.length < 30) {
        throw new Error("Chave pública inválida gerada.");
      }

      // 2) Enviar ao backend
      await postJSON("/auth/import", {
        input: secretKey,
      });

      // 3) Salvar no contexto
      saveWallet({
        walletAddress: publicKey,
        // @ts-ignore
        secretKey: secretKey,
      });

      // 4) Fechar modal e redirecionar
      onClose();
      window.location.href = "/wallet";

    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Falha ao importar a carteira.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>Import Wallet (Solana)</h2>

        <S.Label>Private Key / Seed Phrase</S.Label>

        <S.TextArea
          placeholder="Paste your seed phrase, private key base58 or JSON array"
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
