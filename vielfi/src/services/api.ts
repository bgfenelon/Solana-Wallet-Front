// src/services/api.ts
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function getJSON(path: string) {
  const res = await fetch(API_URL + path, {
    method: "GET",
    credentials: "include" // <-- obrigatório
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}

export async function postJSON(path: string, body: any) {
  const res = await fetch(API_URL + path, {
    method: "POST",
    credentials: "include", // <-- obrigatório
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text);

  return JSON.parse(text);
}
