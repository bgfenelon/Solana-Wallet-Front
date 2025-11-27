// src/Components/ModalCreate/index.tsx
import React, { useState } from "react";
import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { useNavigate } from "react-router-dom";

import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";
import nacl from "tweetnacl";
import bs58 from "bs58";

import { postJSON } from "../../services/api"; // seu helper de API
import { useAuth } from "../../hooks/useAuth";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ModalCreate({ open, onClose }: ModalProps) {
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  const { refresh } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  // Gera a wallet (compatível com browser)
  function generateWallet() {
    const mnemonic = bip39.generateMnemonic(wordlist, 128);
    const seed = bip39.mnemonicToSeedSync(mnemonic); // returns Uint8Array
    const hd = HDKey.fromMasterSeed(seed).derive("m/44'/501'/0'/0'");
    const seed32 = hd.privateKey as Uint8Array;
    const keypair = nacl.sign.keyPair.fromSeed(seed32);
    const publicKey = bs58.encode(keypair.publicKey);
    const secretKey = bs58.encode(keypair.secretKey);
    return { mnemonic, publicKey, secretKey };
  }

  const wallet = generateWallet();

  async function handleCreate() {
    if (!name.trim() || !checked) {
      setError(true);
      return;
    }

    try {
      const base = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
      // envia mnemonic (ou secret) para seu backend. ajuste o path se necessário
      await fetch(`${base}/auth/import`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: wallet.mnemonic, name: name.trim() }),
      });

      // pede para o hook atualizar a sessão (refresh)
      await refresh();

      onClose();
      navigate("/wallet");
    } catch (e: any) {
      console.error("create wallet error:", e);
      alert(e?.message ?? "Erro ao criar wallet");
    }
  }

  return (
    <S.Overlay onClick={onClose}>
      {/* passamos error como boolean | undefined para evitar warn */}
      <S.ModalContainer onClick={(e) => e.stopPropagation()} error={error ? true : undefined}>
        <h2>Create Wallet (Solana)</h2>

        <S.Input
          placeholder="Wallet name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(false);
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
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span>I confirm I saved my seed phrase.</span>
        </S.CheckRow>

        {error && <S.ErrorMsg>Please fill all required fields.</S.ErrorMsg>}

        <S.Actions>
          <S.SecondaryButton onClick={onClose}>Cancel</S.SecondaryButton>
          <PrimaryButton onClick={handleCreate}>Create →</PrimaryButton>
        </S.Actions>
      </S.ModalContainer>
    </S.Overlay>
  );
}
