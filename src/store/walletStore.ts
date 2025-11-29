import { mnemonicToSeedSync, validateMnemonic } from "@scure/bip39";
import * as englishWordlistModule from "@scure/bip39/wordlists/english";
// Accept multiple export shapes: { english: [...] } OR default export [...]: normalize to string[]
const englishWordlist: string[] =
  (englishWordlistModule as any).english ??
  (englishWordlistModule as any).default ??
  (englishWordlistModule as any);
import { Keypair } from "@solana/web3.js";

/**
 * Importa uma wallet via mnemonic ou private key.
 */
export function importAnyWallet(input: string) {
  const clean = input.trim();

  // ---------------------------
  // 1) IMPORT VIA SEED PHRASE
  // ---------------------------
  const words = clean.split(/\s+/);

  // Se tiver 12 ou mais palavras, tentamos validar como seed phrase
  if (words.length >= 12) {
    if (!validateMnemonic(clean, englishWordlist)) {
      throw new Error("Invalid seed phrase");
    }

    const seed = mnemonicToSeedSync(clean); // retorna 64 bytes
    const seed32 = seed.slice(0, 32); // Solana usa somente 32 bytes

    const keypair = Keypair.fromSeed(seed32);

    return {
      type: "mnemonic",
      publicKey: keypair.publicKey.toBase58(),
      privateKey: JSON.stringify(Array.from(keypair.secretKey)),
    };
  }

  // ---------------------------
  // 2) IMPORT VIA PRIVATE KEY JSON (ARRAY DE 64 BYTES)
  // ---------------------------
  try {
    const arr = JSON.parse(clean);

    if (!Array.isArray(arr) || arr.length !== 64) {
      throw new Error("Invalid private key array");
    }

    const uint = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(uint);

    return {
      type: "private_key",
      publicKey: keypair.publicKey.toBase58(),
      privateKey: JSON.stringify(arr),
    };
  } catch (e) {
    throw new Error("Invalid input format (seed phrase or private key expected)");
  }
}
