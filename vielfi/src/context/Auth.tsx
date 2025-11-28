import React, { createContext, useContext, useEffect, useState } from "react";

//
// 🔹 Tipos
//
type WalletSession = {
  walletAddress: string | null;
  secretKey?: number[];
};

type AuthContextType = {
  session: WalletSession | null;
  saveWallet: (data: WalletSession) => void;
  logout: () => void;
  loading: boolean;
};

//
// 🔹 Criação do contexto
//
export const AuthContext = createContext<AuthContextType | null>(null);

//
// 🔹 Provider
//
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<WalletSession | null>(null);
  const [loading, setLoading] = useState(true);

  // carregar wallet do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wallet");
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch (err) {
        console.error("Erro ao carregar wallet do localStorage", err);
      }
    }
    setLoading(false);
  }, []);

  function saveWallet(data: WalletSession) {
    localStorage.setItem("wallet", JSON.stringify(data));
    setSession(data);
  }

  function logout() {
    localStorage.removeItem("wallet");
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, saveWallet, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

//
// 🔹 Hook useAuth — exportado aqui!
//
export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    console.warn("⚠ useAuth usado fora do AuthProvider");
    return {
      session: null,
      saveWallet: () => {},
      logout: () => {},
      loading: true,
    };
  }

  return ctx;
}
