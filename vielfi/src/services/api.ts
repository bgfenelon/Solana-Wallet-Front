const API_BASE =
  (import.meta.env.VITE_API_URL?.replace(/\/$/, "")) ||
  "https://node-veilfi-jtae.onrender.com";  // REMOVE BARRA DUPLA

// ---------------------
// SAFE PARSE
// ---------------------
async function safeParse(res: Response) {
  const txt = await res.text().catch(() => "");
  try {
    return txt ? JSON.parse(txt) : {};
  } catch {
    return { message: txt };
  }
}

// ---------------------
// GET (sem credentials p/ Render)
// ---------------------
export async function getJSON(path: string, options: RequestInit = {}) {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ...(options.headers || {}),
    },
  });

  const data = await safeParse(res);

  if (!res.ok) {
    throw new Error(data.message || `GET ${path} → ${res.status}`);
  }

  return data;
}

// ---------------------
// POST (sem credentials p/ Render)
// ---------------------
export async function postJSON(path: string, body: any, options: RequestInit = {}) {
  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: JSON.stringify(body),
  });

  const data = await safeParse(res);

  if (!res.ok) {
    throw new Error(data.message || `POST ${path} → ${res.status}`);
  }

  return data;
}

// ---------------------
// AUTH
// ---------------------
export function importWallet(input: string) {
  return postJSON("/auth/import", { input });
}

// ---------------------
// SESSION
// ---------------------
export function getSession() {
  return getJSON("/session/me");
}

// ---------------------
// USER
// ---------------------
export function postUserBalance(userPubkey: string) {
  return postJSON("/user/balance", { userPubkey });
}

// ---------------------
// SWAP / BUY
// ---------------------
export function createOrder(usdAmount: number, buyer: string) {
  return postJSON("/swap/buy/init", { usdAmount, buyer });
}

export function confirmOrder(orderId: string, paymentSignature: string, buyer: string) {
  return postJSON("/swap/buy/confirm", { orderId, paymentSignature, buyer });
}
