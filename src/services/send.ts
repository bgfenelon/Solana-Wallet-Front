// swap.js – Jupiter-based swap endpoint (SOL <-> USDC)

// ---------------------------
// Imports
// ---------------------------
const express = require("express");
const router = express.Router();
const bs58 = require("bs58");

// FIX: Prevent TS/Node redeclaration conflict for fetch
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const {
  Connection,
  PublicKey,
  Keypair,
  VersionedTransaction,
} = require("@solana/web3.js");

// ---------------------------
// RPC
// ---------------------------
const RPC_URL =
  process.env.RPC_URL ||
  "https://api.mainnet-beta.solana.com"; // Melhor para evitar 429

const connection = new Connection(RPC_URL, "confirmed");

// ---------------------------
// Jupiter
// ---------------------------
const JUP_QUOTE_URL = "https://api.jup.ag/quote";
const JUP_SWAP_URL = "https://api.jup.ag/swap";

// Tokens
const SOL_MINT = "So11111111111111111111111111111111111111112";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

// ---------------------------
// Helpers
// ---------------------------
function parseSecretKey(secretKey) {
  if (!secretKey) throw new Error("secretKey missing");

  if (Array.isArray(secretKey))
    return Keypair.fromSecretKey(Uint8Array.from(secretKey));

  if (typeof secretKey === "string" && secretKey.trim().startsWith("[")) {
    const arr = JSON.parse(secretKey);
    return Keypair.fromSecretKey(Uint8Array.from(arr));
  }

  return Keypair.fromSecretKey(bs58.decode(secretKey));
}

function ensureDirection(dir) {
  dir = (dir || "").toUpperCase();
  if (dir === "SOL_TO_USDC") return dir;
  if (dir === "USDC_TO_SOL") return dir;
  throw new Error("Invalid direction. Use SOL_TO_USDC or USDC_TO_SOL");
}

function atomic(amount, mint) {
  if (mint === SOL_MINT) return Math.floor(amount * 1e9);
  return Math.floor(amount * 1e6); // USDC decimals
}

// Timeout wrapper
async function fetchWithTimeout(url, opt = {}, timeout = 10_000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const res = await fetch(url, { ...opt, signal: controller.signal });
  clearTimeout(id);
  return res;
}

// ---------------------------
// Jupiter swap
// ---------------------------
router.post("/jupiter", async (req, res) => {
  try {
    const { carteiraUsuarioPublica, carteiraUsuarioPrivada, amount, direction } = req.body;

    if (!carteiraUsuarioPublica || !carteiraUsuarioPrivada || !amount || !direction) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const dir = ensureDirection(direction);

    let pubkey;
    try {
      pubkey = new PublicKey(carteiraUsuarioPublica);
    } catch {
      return res.status(400).json({ error: "Invalid public key" });
    }

    let kp;
    try {
      kp = parseSecretKey(carteiraUsuarioPrivada);
    } catch (err) {
      return res.status(400).json({ error: "Invalid secretKey", details: err.message });
    }

    const inputMint = dir === "SOL_TO_USDC" ? SOL_MINT : USDC_MINT;
    const outputMint = dir === "SOL_TO_USDC" ? USDC_MINT : SOL_MINT;

    const amountAtomic = atomic(Number(amount), inputMint);

    // 1 — Quote
    const quoteURL = `${JUP_QUOTE_URL}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountAtomic}&slippageBps=50`;

    const quoteResp = await fetchWithTimeout(quoteURL);
    if (!quoteResp.ok) return res.status(502).json({ error: "Quote error" });

    const quoteJson = await quoteResp.json();

    if (!quoteJson.data && !quoteJson.routePlan && !quoteJson.routes)
      return res.status(500).json({ error: "No route found", details: quoteJson });

    // 2 — Swap transaction
    const swapResp = await fetchWithTimeout(JUP_SWAP_URL, {
      method: "POST",
      body: JSON.stringify({
        quoteResponse: quoteJson,
        userPublicKey: pubkey.toBase58(),
        wrapAndUnwrapSol: true,
      }),
      headers: { "content-type": "application/json" },
    });

    if (!swapResp.ok) {
      return res.status(502).json({ error: "Swap tx error", body: await swapResp.text() });
    }

    const swapJson = await swapResp.json();
    if (!swapJson.swapTransaction)
      return res.status(500).json({ error: "No swapTransaction from Jupiter" });

    // 3 — Sign + send
    const txBuffer = Buffer.from(swapJson.swapTransaction, "base64");
    const tx = VersionedTransaction.deserialize(txBuffer);

    tx.sign([kp]);

    const signature = await connection.sendRawTransaction(tx.serialize());
    await connection.confirmTransaction(signature, "confirmed");

    return res.json({ success: true, signature });

  } catch (err) {
    console.error("SWAP ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
