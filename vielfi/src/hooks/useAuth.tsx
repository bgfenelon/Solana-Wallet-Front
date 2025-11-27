// useAuth.tsx
import { useEffect, useState } from "react";
import { getJSON } from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchSession() {
    try {
      const res = await getJSON("/session/me");
      setUser(res.user);
    } catch (err) {
      console.warn("Nenhuma sessão ativa");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return { user, loading, refresh: fetchSession };
}
