import { useState, useEffect } from "react";
import { getJSON } from "../services/api";

export function useAuth() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const data = await getJSON("/session/me");

      if (data?.ok && data?.user?.walletPubkey) {
        setWalletAddress(data.user.walletPubkey);
      } else {
        setWalletAddress(null);
      }

    } catch {
      setWalletAddress(null);
    }

    setLoading(false);
  }

  useEffect(() => {
    refresh();
    const i = setInterval(refresh, 8000);
    return () => clearInterval(i);
  }, []);

  return { walletAddress, loading, refresh };
}
