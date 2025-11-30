import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export function importAnyWallet(input: string) {
  const text = input.trim();

  // 1️⃣ Seed phrase real (12–24 palavras)
  const words = text.split(/\s+/);
  if (words.length >= 12 && words.length <= 24) {
    if (!bip39.validateMnemonic(text)) {
      throw new Error("Invalid seed phrase");
    }

    const seed = bip39.mnemonicToSeedSync(text);
    const path = "m/44'/501'/0'/0'";
    const derived = derivePath(path, seed.toString("hex")).key;

    const keypair = Keypair.fromSeed(derived);

    return {
      type: "mnemonic",
      publicKey: keypair.publicKey.toBase58(),
      privateKey: JSON.stringify(Array.from(keypair.secretKey)),
    };
  }

  // 2️⃣ Base58 private key
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

  // 3️⃣ JSON array private key
  try {
    const arr = JSON.parse(text);
    if (Array.isArray(arr) && arr.length === 64) {
      const keypair = Keypair.fromSecretKey(Uint8Array.from(arr));
      return {
        type: "json",
        publicKey: keypair.publicKey.toBase58(),
        privateKey: JSON.stringify(arr),
      };
    }
  } catch {}

  throw new Error("Invalid format: seed phrase, private key base58, or JSON array.");
}
