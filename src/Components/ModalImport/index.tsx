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

export default function ModalImport({ open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { saveWallet } = useAuth(); // 🔥 usado para salvar a carteira REAL

  if (!open) return null;

  async function handleImport() {
    setError(null);
    setLoading(true);

    try {
      // 1️⃣ Validar chave/seed offline e obter keypair real
      const wallet = importAnyWallet(input);

      const realPubkey = wallet.publicKey;
      const realSecretKey: string | number[] = wallet.privateKey; // array de 64 números

      if (!realPubkey || realPubkey.length < 30) {
        throw new Error("Chave pública inválida gerada.");
      }

      // 2️⃣ Chamar opcionalmente o backend (verificação, registro, etc.)
      await postJSON("/auth/import", {
        input: realSecretKey,
      });

      // 3️⃣ SALVAR NO AUTH CONTEXT (forma correta)
      saveWallet({
        walletAddress: realPubkey,
        // @ts-ignore
        secretKey: realSecretKey,
      });

      // 4️⃣ Fechar modal e redirecionar
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
