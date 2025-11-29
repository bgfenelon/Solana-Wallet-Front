// src/Components/ModalCreate/index.tsx
import React, { useMemo, useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useNavigate } from "react-router-dom";
import * as bip39 from "bip39";



import nacl from "tweetnacl";
import bs58 from "bs58";

import { postJSON } from "../../services/api";
import { useAuth } from "../../context/Auth";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalCreate({ open, onClose }: Props) {
  const mnemonic = bip39.generateMnemonic(); // 12 palavras
const seed = bip39.mnemonicToSeedSync(mnemonic);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { saveWallet } = useAuth();

  // Gera nova wallet quando o modal abre
const wallet = useMemo(() => {
  if (!open) return null;

  const mnemonic = bip39.generateMnemonic(); // ✔ funciona 100%
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const seed32 = seed.slice(0, 32);

  const kp = nacl.sign.keyPair.fromSeed(seed32);

  return {
    mnemonic,
    publicKey: bs58.encode(kp.publicKey),
    secretKeyArray: Array.from(kp.secretKey),
  };
}, [open]);

  if (!open || !wallet) return null;

  async function handleCreate() {
    setError(null);

    if (!name.trim()) {
      setError("Please provide a wallet name.");
      return;
    }
    if (!confirmed) {
      setError("Please confirm you saved your seed phrase.");
      return;
    }

    setLoading(true);

    try {
      // Envia seed phrase ao backend
    await postJSON("/auth/import", {
    input: JSON.stringify(wallet.secretKeyArray),
    name: name.trim(),
    });


      // Salva no AuthContext
      saveWallet({
        walletAddress: wallet.publicKey,
        secretKey: wallet.secretKeyArray,
      });

      onClose();
      navigate("/wallet");

    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to create wallet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalContainer onClick={(e) => e.stopPropagation()} error={!!error}>
        <h2>Create Wallet (Solana)</h2>

        <S.Input
          placeholder="Wallet name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
        />

        <h3>Seed Phrase</h3>

        <S.SeedBox>
          <p>{wallet.mnemonic}</p>
          <button onClick={() => navigator.clipboard.writeText(wallet.mnemonic)}>
            Copy
          </button>
        </S.SeedBox>

        <S.CheckRow className={error ? "error" : ""}>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed((s) => !s)}
          />
          <span>I confirm I saved my seed phrase.</span>
        </S.CheckRow>

        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

        <S.Actions>
          <S.SecondaryButton onClick={onClose} disabled={loading}>
            Cancel
          </S.SecondaryButton>

          <PrimaryButton onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create →"}
          </PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
