// src/services/api.ts

const API_BASE = "http://localhost:3001";

/**
 * GET com sessão (cookies incluídos)
 */
export async function getJSON(path: string, options: RequestInit = {}) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    throw new Error(`GET ${path} → ${res.status}`);
  }

  return res.json();
}

/**
 * POST genérico com JSON + cookies
 * Inclui tratamento de erro com mensagem real do backend
 */
export async function postJSON(
  path: string,
  body: any,
  options: RequestInit = {}
) {
  const res = await fetch(API_BASE + path, {
    ...options,
    method: "POST",
    credentials: "include", // mantém a sessão
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: JSON.stringify(body)
  });

  // Tenta capturar JSON ou texto vindo do servidor
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  // Se o backend retornou erro → repassar msg real
  if (!res.ok) {
    throw new Error(data.message || `Erro POST ${path}: ${res.status}`);
  }

  return data;
}

/* -------------------------------------------------
 * AUTH
 * ------------------------------------------------- */

/**
 * Importar carteira via seed (mnemonic)
 */
export function importWallet(mnemonic: string) {
  return postJSON("/auth/import", { mnemonic });
}

/**
 * Registrar carteira na sessão
 */
export function registerWallet(walletPubkey: string) {
  return postJSON("/auth/register", { walletPubkey });
}

/**
 * Logout
 */
export function logoutWallet() {
  return postJSON("/auth/logout", {});
}

/* -------------------------------------------------
 * SESSION
 * ------------------------------------------------- */

/**
 * Obter sessão atual
 */
export function getSession() {
  return getJSON("/session/me");
}

/**
 * Login manual (salva wallet na sessão do servidor)
 */
export function login(walletPubkey: string) {
  return postJSON("/session/login", { walletPubkey });
}

/* -------------------------------------------------
 * SWAP / BUY VEIL
 * ------------------------------------------------- */

/**
 * Criar pedido de compra
 */
export function createOrder(usdAmount: number, buyer: string) {
  return postJSON("/swap/buy/init", {
    usdAmount,
    buyer
  });
}

/**
 * Confirmar pagamento (tx) e enviar tokens
 */
export function confirmOrder(
  orderId: string,
  paymentSignature: string,
  buyer: string
) {
  return postJSON("/swap/buy/confirm", {
    orderId,
    paymentSignature,
    buyer
  });
}

/* -------------------------------------------------
 * WALLET
 * ------------------------------------------------- */

/**
 * Confirmar depósito de SOL
 */
export function checkDeposit(signature: string) {
  return postJSON("/wallet/deposit/check", { signature });
}
