// src/services/api.ts
import { createOrder } from "../../services/api";


const API_BASE = (import.meta as any).env?.VITE_API_URL ?? "https://node-veilfi-jtae.onrender.com";

export async function createOrder(data: any) {
  return postJSON("/order/create", data);
}

export async function confirmOrder(data: any) {
  return postJSON("/order/confirm", data);
}
/** Safe parse */
async function safeParse(res: Response) {
  const txt = await res.text().catch(() => "");
  try {
    return txt ? JSON.parse(txt) : {};
  } catch {
    return { message: txt };
  }
}

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
  if (!res.ok) throw new Error(data.message || `GET ${path} → ${res.status}`);
  return data;
}

export async function postJSON(path: string, body: any, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "POST",
    credentials: "include", // ⬅️ fundamental
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

/* API helpers usados no front */
export function importWalletAPI(input: string) {
  return postJSON("/auth/import", { input });
}

export function getSessionAPI() {
  return getJSON("/session/me");
}

export async function postUserBalance(pubkey: string) {
  return postJSON("/wallet/balance", { userPubkey: pubkey });
}

export function postSend(to: string, amount: number) {
  return postJSON("/wallet/send", { to, amount });
}
