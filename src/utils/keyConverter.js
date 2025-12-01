// ===============================
// keyConverter.js
// Conversão de chaves para Solana
// ===============================

const bs58 = require("bs58");

/**
 * Converte qualquer formato de chave privada para Uint8Array válido (64 bytes)
 */
function toUint8Array(secretKey) {
  try {
    // Caso seja string Base58 (ex: “3xhGXHvj…”)
    if (typeof secretKey === "string" && !secretKey.startsWith("[")) {
      return bs58.decode(secretKey);
    }

    // Caso seja string JSON (ex: "[12,33,55,...]")
    if (typeof secretKey === "string" && secretKey.startsWith("[")) {
      const arr = JSON.parse(secretKey);
      return Uint8Array.from(arr);
    }

    // Já é array (ex: [12,55,66,...])
    if (Array.isArray(secretKey)) {
      return Uint8Array.from(secretKey);
    }

    // Já é Uint8Array
    if (secretKey instanceof Uint8Array) {
      return secretKey;
    }

    throw new Error("Formato de chave não reconhecido.");
  } catch (err) {
    console.error("Erro ao converter secret key:", err);
    throw new Error("Chave privada inválida.");
  }
}

/**
 * Converte Uint8Array (64 bytes) para Base58
 */
function toBase58(secretKeyUint8) {
  return bs58.encode(secretKeyUint8);
}

/**
 * Formato correto para salvar no localStorage
 * (sempre como array de números)
 */
function keypairToStorage(keypair) {
  return {
    walletAddress: keypair.publicKey.toBase58(),
    secretKey: Array.from(keypair.secretKey), // formato correto
  };
}

module.exports = {
  toUint8Array,
  toBase58,
  keypairToStorage,
};
