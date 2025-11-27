import bs58 from "bs58";
import bip39 from "bip39";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";

export function importAnyWallet(input: string) {
  const text = input.trim();
  let keypair: Keypair | null = null;

  // Seed phrase
  const words = text.split(" ");
  if (words.length >= 12 && bip39.validateMnemonic(text)) {
    const seed = bip39.mnemonicToSeedSync(text);
    const derived = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    keypair = Keypair.fromSecretKey(derived.secretKey);
  }

  // Base58 private key
  if (!keypair) {
    try {
      const decoded = bs58.decode(text);
      keypair = Keypair.fromSecretKey(decoded);
    } catch (_) {}
  }

  // JSON array
  if (!keypair) {
    try {
      const arr = JSON.parse(text);
      keypair = Keypair.fromSecretKey(Uint8Array.from(arr));
    } catch (_) {}
  }

  if (!keypair) throw new Error("Invalid wallet data");

  return {
    keypair,
    pubkey: keypair.publicKey.toBase58(),
  };
}
