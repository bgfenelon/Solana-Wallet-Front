// ---------------------------
// 🔵 GET /swap/price (ESTÁVEL)
// ---------------------------
router.get("/price", async (req, res) => {
  try {
    const mint = PUMP_MINT.toString();

    // 1) Obter o buildId do Next.js (sempre funciona)
    const manifestUrl = "https://pump.fun/_next/static/build-manifest.json";
    const manifestText = await fetch(manifestUrl).then(r => r.text());

    let buildId = null;
    try {
      const json = JSON.parse(manifestText);
      // o campo "lowPriorityFiles" → primeiro item contém o buildId
      const first = json.lowPriorityFiles?.[0] || "";
      const match = first.match(/_next\/data\/(.*?)\//);
      if (match) buildId = match[1];
    } catch (e) {
      console.error("Failed parsing manifest:", e);
    }

    if (!buildId) {
      return res.status(500).json({ error: "Failed to extract buildId" });
    }

    // 2) URL do token com buildId
    const url = `https://pump.fun/_next/data/${buildId}/token/${mint}.json`;

    const tokenDataText = await fetch(url).then(r => r.text());
    const tokenData = JSON.parse(tokenDataText);

    const data = tokenData?.pageProps?.token || null;

    if (!data) {
      return res.status(404).json({ error: "Token not found (Pump.fun)" });
    }

    return res.json({
      priceSol: data.priceInSol || 0,
      priceUsd: data.priceInUsd || 0,
      symbol: data.symbol,
      name: data.name,
      meta: data
    });

  } catch (err) {
    console.error("PRICE ERROR:", err);
    return res.status(500).json({ error: "Failed to fetch price", details: err.message });
  }
});
