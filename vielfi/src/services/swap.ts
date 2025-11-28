// server/routes/swap.js
const express = require("express");
const router = express.Router();
const swapController = require("../controllers/swapController");

router.get("/price", swapController.getPrice);
router.post("/buy", swapController.buy);
router.post("/sell", swapController.sell);

module.exports = router;
