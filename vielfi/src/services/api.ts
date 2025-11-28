const API = "http://localhost:3001";

export async function createOrder(usdAmount, buyerWallet) {
  const res = await fetch(`${API}/swap/buy/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usdAmount, buyer: buyerWallet })
  });
  return res.json();
}

export async function confirmOrder(orderId, paymentSignature) {
  const res = await fetch(`${API}/swap/buy/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, paymentSignature })
  });
  return res.json();
}
