import { postJSON } from "./api";

export async function executeSwap(body: {
  userPubkey: string;
  fromMint: string;
  toMint: string;
  amount: number;
}) {
  return await postJSON("/swap/execute", body);
}
