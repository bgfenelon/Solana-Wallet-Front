import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TOKENS } from "../config/tokens";

export async function loadSplTokens(address: string) {
  const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=1581ae46-832d-4d46-bc0c-007c6269d2d9");
  const owner = new PublicKey(address);

  // Carrega contas SPL
  const accounts = await connection.getParsedTokenAccountsByOwner(owner, {
    programId: TOKEN_PROGRAM_ID,
  });

  const result = [];

  for (const { account } of accounts.value) {
    const info = account.data.parsed.info;

    const mint = info.mint;
    const amount = Number(info.tokenAmount.amount);
    const decimals = info.tokenAmount.decimals;

    const token = Object.values(TOKENS).find((t) => t.mint === mint);
    if (!token) continue;

    result.push({
      symbol: token.symbol,
      mint,
      decimals,
      balance: amount / 10 ** decimals,
    });
  }

  return result;
}
