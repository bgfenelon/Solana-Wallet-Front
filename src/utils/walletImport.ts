import nacl from "tweetnacl";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

type WalletImportResult = {
  type: "mnemonic" | "base58" | "json";
  publicKey: string;
  privateKey: string;
};

export function importAnyWallet(input: string): WalletImportResult {
  const text = input.trim();

  const words = text.split(/\s+/).filter(Boolean);
  if (words.length >= 12 && words.length <= 24) {
    try {
      const encoder = new TextEncoder();
      const hashed = encoder.encode(text);
      const seed32 = new Uint8Array(32);
      seed32.set(hashed.slice(0, 32));
      const kp = nacl.sign.keyPair.fromSeed(seed32);
      const keypair = Keypair.fromSecretKey(kp.secretKey);
      return {
        type: "mnemonic",
        publicKey: keypair.publicKey.toBase58(),
        privateKey: JSON.stringify(Array.from(keypair.secretKey)),
      };
    } catch { }
  }

  try {
    const decoded = bs58.decode(text);
    if (decoded.length === 64) {
      const keypair = Keypair.fromSecretKey(decoded);
      return {
        type: "base58",
        publicKey: keypair.publicKey.toBase58(),
        privateKey: JSON.stringify(Array.from(keypair.secretKey)),
      };
    }
  } catch {}

  try {
    const arr = JSON.parse(text);
    if (Array.isArray(arr) && arr.length === 64 && arr.every(n => typeof n === "number")) {
      const keypair = Keypair.fromSecretKey(Uint8Array.from(arr));
      return {
        type: "json",
        publicKey: keypair.publicKey.toBase58(),
        privateKey: JSON.stringify(arr),
      };
    }
  } catch {}

  throw new Error("Formato inválido. Esperado: seed phrase, chave base58 ou array JSON.");
}
