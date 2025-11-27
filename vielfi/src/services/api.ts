// src/services/api.ts
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export async function getJSON(path: string) {
  const url = BASE + path;
  const resp = await fetch(url, {
    method: "GET",
    credentials: "include", // se usar cookies/sessão
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`GET ${path} falhou: ${txt}`);
  }
  return resp.json();
}

export async function postJSON(path: string, body: any) {
  const url = BASE + path;
  const resp = await fetch(url, {
    method: "POST",
    credentials: "include", // se usar cookies/sessão
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`POST ${path} falhou: ${txt}`);
  }
  return resp.json();
}
