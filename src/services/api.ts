/* ===========================================================
    CONFIG
=========================================================== */

const API_BASE = import.meta.env.VITE_API_URL ?? "https://node-veilfi-jtae.onrender.com";

/* ===========================================================
    SAFE PARSE
=========================================================== */
async function safeParse(res: Response) {
  const txt = await res.text().catch(() => "");
  try {
    return txt ? JSON.parse(txt) : {};
  } catch {
    return { message: txt };
  }
}

/* ===========================================================
    GET
=========================================================== */
export async function getJSON(path: string, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await safeParse(res);

  if (!res.ok) {
    throw new Error(data.message || `GET ${path} → ${res.status}`);
  }

  return data;
}

/* ===========================================================
    POST
=========================================================== */
export async function postJSON(path: string, body: any, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "POST",
    credentials: "include",
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

/* ===========================================================
    AUTH
=========================================================== */
export function importWallet(input: string) {
  return postJSON("/auth/import", { input });
}

/* ===========================================================
    SESSION
=========================================================== */
export function getSession() {
  return getJSON("/session/me");
}

/* ===========================================================
    BALANCE  (ROTA CORRETA DA SUA API)
=========================================================== */
export function postUserBalance(userPubkey: string) {
  return postJSON("/user/balance", { userPubkey });
}

/* ===========================================================
    SWAP / BUY
=========================================================== */

// Criar ordem de compra
export function createOrder(usdAmount: number, buyer: string) {
  return postJSON("/swap/buy/init", { usdAmount, buyer });
}

// Confirmar ordem (ASSINATURA DO PAGAMENTO)
export function confirmOrder(orderId: string, paymentSignature: string, buyer: string) {
  return postJSON("/swap/buy/confirm", { orderId, paymentSignature, buyer });
}
