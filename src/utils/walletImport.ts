import nacl from "tweetnacl";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

type WalletImportResult = {
  type: "mnemonic" | "base58" | "json";
  publicKey: string;
  privateKey: string; // sempre BASE58
};

// Função simples para detectar seed phrase sem bip39.
function looksLikeMnemonic(text: string): boolean {
  const words = text.trim().split(/\s+/);
  return words.length >= 12 && words.length <= 24;
}

export function importAnyWallet(input: string): WalletImportResult {
  const text = input.trim();

  // =====================================
  // 1) SEED PHRASE (SIMULADA, NÃO BIP39)
  // =====================================
  if (looksLikeMnemonic(text)) {
    const encoder = new TextEncoder();
    const hashed = encoder.encode(text);

    const seed32 = new Uint8Array(32);
    seed32.set(hashed.slice(0, 32));

    const kp = nacl.sign.keyPair.fromSeed(seed32);
    const keypair = Keypair.fromSecretKey(kp.secretKey);

    return {
      type: "mnemonic",
      publicKey: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey), // base58 REAL
    };
  }

  // =====================================
  // 2) PRIVATE KEY BASE58
  // =====================================
  try {
    const decoded = bs58.decode(text);

    if (decoded.length === 64) {
      const keypair = Keypair.fromSecretKey(decoded);

      return {
        type: "base58",
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey),
      };
    }
  } catch {}

  // =====================================
  // 3) ARRAY JSON "[1,2,3,...]"
  // =====================================
  try {
    const arr = JSON.parse(text);

    if (
      Array.isArray(arr) &&
      arr.length === 64 &&
      arr.every((n) => typeof n === "number")
    ) {
      const keypair = Keypair.fromSecretKey(Uint8Array.from(arr));

      return {
        type: "json",
        publicKey: keypair.publicKey.toBase58(),
        privateKey: bs58.encode(keypair.secretKey),
      };
    }
  } catch {}

  throw new Error(
    "Formato inválido. Esperado: seed phrase (12–24 palavras), chave base58 ou JSON array."
  );
}
