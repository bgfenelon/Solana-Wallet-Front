// src/Components/ModalImport/index.tsx
import { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

function ModalImport({ open, onClose }: ModalProps) {
  const [data, setData] = useState("");
  const { importWallet } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  async function handleImport() {
    try {
      await importWallet(data.trim());
      onClose();
      navigate("/wallet");
    } catch (e: any) {
      console.error("Erro importWallet:", e);
      // mostra a mensagem que o backend retornar, se existir
      const msg = e?.message || "Erro ao importar wallet";
      alert(msg);
    }
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>Import Wallet</h2>
        <p>Enter private key, array or seed phrase:</p>

        <S.TextArea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="seed phrase OR base58 private key OR [1,2,3,...]"
        />

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>
          <PrimaryButton disabled={!data.trim()} onClick={handleImport}>
            Import →
          </PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}

export default ModalImport;
