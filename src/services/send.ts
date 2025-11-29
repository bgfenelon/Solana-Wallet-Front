import { postJSON } from "./api";

export async function sendSOL(to: string, amount: number) {
  return await postJSON("/send", { to, amount });
}
