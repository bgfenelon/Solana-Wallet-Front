// src/services/send.ts

export type TokenType = "SOL" | "USDC" | "VEIL";

export interface SendPayload {
  secretKey: string;
  recipient: string;
  amount: number;
  token: TokenType;
}

export interface SendResponse {
  success?: boolean;
  signature?: string;
  error?: string;
  details?: string;
}

// ================================
// Base POST to backend
// ================================
export async function sendTransaction(
  data: SendPayload
): Promise<SendResponse> {
  try {
    const response = await fetch("/wallet/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (err: any) {
    return {
      error: "Network error",
      details: err.message,
    };
  }
}

// ================================
// Dedicated functions
// ================================
export function sendSOL(secretKey: string, recipient: string, amount: number) {
  return sendTransaction({ secretKey, recipient, amount, token: "SOL" });
}

export function sendUSDC(secretKey: string, recipient: string, amount: number) {
  return sendTransaction({ secretKey, recipient, amount, token: "USDC" });
}

export function sendVEIL(secretKey: string, recipient: string, amount: number) {
  return sendTransaction({ secretKey, recipient, amount, token: "VEIL" });
}

// ================================
// Validators
// ================================
export function isValidAddress(address: string) {
  return address.length > 30 && address.length < 60;
}

export function isValidAmount(value: number | string) {
  const n = Number(value);
  return !isNaN(n) && n > 0;
}
