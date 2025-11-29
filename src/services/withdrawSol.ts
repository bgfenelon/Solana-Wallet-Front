import { postJSON } from "./api";

export async function withdrawSol(userId: string, destination: string, amount: number) {
  return postJSON("/withdraw/sol", {
    userId,
    destination,
    amount
  });
}
