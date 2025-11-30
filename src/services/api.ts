/* ===========================================================
    CONFIG
=========================================================== */
const API_BASE =
  import.meta.env.VITE_API_URL ?? "https://node-veilfi-jtae.onrender.com";

/* ===========================================================
    SAFE FETCH
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
    GET / POST HELPERS
=========================================================== */

export async function getJSON(path: string) {
  const res = await fetch(API_BASE + path, {
    method: "GET",
    credentials: "include",
  });

  return await safeParse(res);
}

export async function postJSON(path: string, body: any) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return await safeParse(res);
}

/* AUTH */
export function importWallet(input: string) {
  return postJSON("/auth/import", { input });
}

/* SESSION */
export function getSession() {
  return getJSON("/session/me");
}

/* BALANCE */
export function postUserBalance(userPubkey: string) {
  return postJSON("/user/balance", { userPubkey });
}

/* SWAP */
export function createOrder(usdAmount: number, buyer: string) {
  return postJSON("/swap/buy/init", { usdAmount, buyer });
}

export function confirmOrder(orderId: string, paymentSignature: string, buyer: string) {
  return postJSON("/swap/buy/confirm", {
    orderId,
    paymentSignature,
    buyer,
  });
}
