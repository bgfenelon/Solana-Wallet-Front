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
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { saveWallet } = useAuth();

  const wallet = useMemo(() => {
    if (!open) return null;

    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const seed32 = seed.slice(0, 32);

    const kp = nacl.sign.keyPair.fromSeed(seed32);

    return {
      mnemonic,
      publicKey: bs58.encode(kp.publicKey),
      secretKey58: bs58.encode(kp.secretKey), // sempre base58
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
      // cadastrar no backend
      await postJSON("/auth/import", {
        input: wallet.secretKey58,   // base58
        name: name.trim(),
      });

      // salvar no sistema
      saveWallet({
        walletAddress: wallet.publicKey,
        secretKey: wallet.secretKey58, // base58
      });

      onClose();
      navigate("/wallet");
    } catch (err: any) {
      setError(err?.message || "Failed to create wallet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Overlay>
      <S.ModalContainer>
        <h2>Create Wallet (Solana)</h2>

        <h3>Seed Phrase</h3>

        <S.Input
          placeholder="Wallet name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
        />

        <S.SeedBox>
          <p>{wallet.mnemonic}</p>
          <button onClick={() => navigator.clipboard.writeText(wallet.mnemonic)}>
            Copy
          </button>
        </S.SeedBox>

        <S.CheckRow>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed((s) => !s)}
          />
          <label>I have saved my seed phrase</label>
        </S.CheckRow>

        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>

          <PrimaryButton onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create →"}
          </PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
