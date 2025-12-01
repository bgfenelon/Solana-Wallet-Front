import React, { createContext, useContext, useEffect, useState } from "react";
import { getJSON } from "../services/api";

type SessionData = {
  walletAddress: string | null;
  secretKey: string | null; // SEMPRE base58
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
      // ============================
      // 1 — CARREGAR LOCALSTORAGE
      // ============================
      const saved = localStorage.getItem("walletSession");
      if (saved) {
        try {
          const parsed: SessionData = JSON.parse(saved);

          // Garantir que secretKey está no formato correto
          if (parsed.secretKey && typeof parsed.secretKey !== "string") {
            console.error("SecretKey inválida no localStorage. Resetando.");
            localStorage.removeItem("walletSession");
          } else {
            setSession(parsed);
          }
        } catch (err) {
          console.error("Erro ao carregar walletSession:", err);
        }
      }

      // ============================
      // 2 — CARREGAR SESSION REMOTA
      // ============================
      try {
        const res = await getJSON("/session/me");

        if (res.ok && res.user) {
          setSession({
            walletAddress: res.user.walletPubkey,
            secretKey: res.user.secretKey, // deve vir base58
          });
        }
      } catch (err) {
        console.log("Nenhuma sessão remota encontrada.");
      }

      setLoading(false);
    }

    load();
  }, []);

  // ============================
  // SALVAR WALLET
  // ============================
  function saveWallet(data: SessionData) {
    const normalized: SessionData = {
      walletAddress: data.walletAddress,
      secretKey: data.secretKey, // JÁ É BASE58 SEMPRE
    };

    setSession(normalized);
    localStorage.setItem("walletSession", JSON.stringify(normalized));
  }

  // ============================
  // LOGOUT
  // ============================
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
