import { postJSON } from "./api";

export async function fetchWalletData(pubkey: string) {
  return postJSON("/user/balance", { userPubkey: pubkey });
}

export default fetchWalletData;
