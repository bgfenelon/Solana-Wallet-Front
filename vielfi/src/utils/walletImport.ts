// src/utils/walletImport.ts
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

// Aceita seed phrase sem validar pela wordlist
export function importAnyWallet(input: string) {
  const text = input.trim();
  let keypair: Keypair | null = null;

  // 1 — tentativa de seed phrase (12–24 words)
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length >= 12 && words.length <= 24) {
    try {
      // converter a seed phrase em bytes manualmente
      // (SEM validar wordlist!)
      const hashed = new TextEncoder().encode(text);
      const seed32 = hashed.slice(0, 32).padEnd?.(32, 0) || hashed.slice(0, 32);

      const kp = nacl.sign.keyPair.fromSeed(seed32);
      keypair = Keypair.fromSecretKey(kp.secretKey);

      return {
        type: "mnemonic",
        publicKey: keypair.publicKey.toBase58(),
        privateKey: JSON.stringify(Array.from(keypair.secretKey)),
      };
    } catch (_) {}
  }

  // 2 — Base58 secret key
  try {
    const decoded = bs58.decode(text);
    if (decoded.length === 64) {
      const kp = Keypair.fromSecretKey(decoded);
      return {
        type: "base58",
        publicKey: kp.publicKey.toBase58(),
        privateKey: JSON.stringify(Array.from(kp.secretKey)),
      };
    }
  } catch {}

  // 3 — JSON array
  try {
    const arr = JSON.parse(text);
    if (Array.isArray(arr) && arr.length === 64) {
      const kp = Keypair.fromSecretKey(Uint8Array.from(arr));
      return {
        type: "json",
        publicKey: kp.publicKey.toBase58(),
        privateKey: JSON.stringify(arr),
      };
    }
  } catch {}

  throw new Error("Invalid wallet data (seed phrase, base58, or JSON array expected)");
}
