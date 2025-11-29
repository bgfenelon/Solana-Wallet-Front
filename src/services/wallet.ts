// server/routes/wallet.js
import express from "express";
const router = express.Router();
import { getSolanaWalletInfo } from "../services/solana";

// GET /wallet/balance?address=XXXX
router.get("/user/balance", async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: "Missing address param" });
    }

    const info = await getSolanaWalletInfo(address);
    return res.json(info);
  } catch (err) {
    console.error("GET /wallet/balance error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
