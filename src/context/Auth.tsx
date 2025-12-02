import React, { createContext, useContext, useEffect, useState } from "react";
import { getJSON } from "../services/api";

type SessionData = {
  walletAddress: string | null;
  secretKey: string | null; // sempre base58
};

type AuthType = {
  session: SessionData | null;
  loading: boolean;
  saveWallet: (data: SessionData) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthType>({
  session: null,
  loading: true,
  saveWallet: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: any) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // ---------------------
        // LOCAL STORAGE
        // ---------------------
        const saved = localStorage.getItem("walletSession");

        if (saved) {
          const parsed = JSON.parse(saved);

          if (typeof parsed.secretKey === "string") {
            setSession(parsed);
          } else {
            console.warn("Invalid secretKey in localStorage. Resetting.");
            localStorage.removeItem("walletSession");
          }
        }

        // ---------------------
        // REMOTE SESSION
        // ---------------------
        const res = await getJSON("/session/me").catch(() => null);

        if (res && res.ok && res.user) {
          setSession({
            walletAddress: res.user.walletPubkey,
            secretKey: res.user.secretKey,
          });
        }
      } catch (err) {
        console.error("Auth error:", err);
      }

      setLoading(false);
    }

    load();
  }, []);

  function saveWallet(data: SessionData) {
    const normalized: SessionData = {
      walletAddress: data.walletAddress,
      secretKey: data.secretKey,
    };

    setSession(normalized);
    localStorage.setItem("walletSession", JSON.stringify(normalized));
  }

  function logout() {
    setSession(null);
    localStorage.removeItem("walletSession");
  }

  return (
    <AuthContext.Provider value={{ session, loading, saveWallet, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
