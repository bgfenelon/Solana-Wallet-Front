import express from "express";
const router = express.Router();
const { getUser } = require("../sessionMemory");

router.get("/me", (req, res) => {
  const user = getUser();
  if (!user) return res.status(404).json({ error: "No session" });
  res.json({ user });
});

export default router;
