// server/routes/swap.js
const express = require("express");
const router = express.Router();
const { getSession } = require("../sessions");
const { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Connection, Keypair } = require("@solana/web3.js");
const fetch = require("node-fetch");

const RPC = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC, "confirmed");

const TOKEN_MINT = process.env.TOKEN_MINT;
const TOKEN_NAME = process.env.TOKEN_NAME || "TOKEN";
const FALLBACK_SOL = Number(process.env.TOKEN_PRICE_SOL || 0);
const FALLBACK_USD = Number(process.env.TOKEN_PRICE_USD || 0);

// ===============================================
// 🔵 FUNÇÃO QUE BUSCA PREÇO DA PUMP + FALLBACK
// ===============================================
async function getTokenPrice() {
  try {
    const manifestUrl = "https://pump.fun/_next/static/build-manifest.json";
    const manifestText = await fetch(manifestUrl).then(r => r.text()).catch(() => null);

    let realSol = 0;
    let realUsd = 0;
    let meta = {};

    if (manifestText) {
      const manifest = JSON.parse(manifestText);
      const first = manifest.lowPriorityFiles?.[0];
      const m = first.match(/_next\/data\/(.*?)\//);
      const buildId = m?.[1];

      if (buildId) {
        const url = `https://pump.fun/_next/data/${buildId}/token/${TOKEN_MINT}.json`;
        const raw = await fetch(url).then(r => r.json()).catch(() => null);
        const token = raw?.pageProps?.token;

        if (token) {
          realSol = token.priceInSol || 0;
          realUsd = token.priceInUsd || 0;
          meta = token;
        }
      }
    }

    return {
      priceSol: realSol > 0 ? realSol : FALLBACK_SOL,
      priceUsd: realUsd > 0 ? realUsd : FALLBACK_USD,
      usingFallback: realSol === 0,
      meta
    };

  } catch (err) {
    return {
      priceSol: FALLBACK_SOL,
      priceUsd: FALLBACK_USD,
      usingFallback: true,
      error: err.message
    };
  }
}

// ===============================================
// 🔵 GET /swap/price  (MOSTRA PREÇO)
// ===============================================
router.get("/price", async (req, res) => {
  const price = await getTokenPrice();
  res.json(price);
});

// ========================================================
// 🔵 POST /swap/buy
// O USUÁRIO COMPRA TOKEN ENVIANDO SOL PARA UMA WALLET CENTRAL
// ========================================================
router.post("/buy", async (req, res) => {
  try {
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) return res.status(401).json({ error: "NO_SESSION" });

    const session = getSession(sessionId);
    if (!session) return res.status(401).json({ error: "INVALID_SESSION" });

    const { amountSol } = req.body;
    if (!amountSol || amountSol <= 0) {
      return res.status(400).json({ error: "INVALID_AMOUNT" });
    }

    const walletSecret = Uint8Array.from(session.secretKey);
    const userKeypair = Keypair.fromSecretKey(walletSecret);

    // pegar preço
    const price = await getTokenPrice();
    const tokens = amountSol / price.priceSol;

    // endereço central da plataforma (recebe SOL)
    const platformWallet = new PublicKey(process.env.PLATFORM_WALLET);

    const lamports = Math.floor(amountSol * LAMPORTS_PER_SOL);

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: userKeypair.publicKey,
        toPubkey: platformWallet,
        lamports
      })
    );

    const signature = await connection.sendTransaction(tx, [userKeypair]);

    res.json({
      ok: true,
      mode: "buy",
      amountSol,
      tokens,
      signature,
      price
    });

  } catch (err) {
    console.error("BUY ERROR:", err);
    res.status(500).json({ error: "BUY_FAILED", details: err.message });
  }
});

module.exports = router;
