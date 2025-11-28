import { createContext, useContext, useState, useEffect } from "react";

type WalletSession = {
  walletAddress: string;
  secretKey: number[];
};

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [session, setSession] = useState<WalletSession | null>(null);

  // Carrega da localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("wallet");
    if (saved) {
      setSession(JSON.parse(saved));
    }
  }, []);

  // Salva wallet no localStorage
  function saveWallet(data: WalletSession) {
    localStorage.setItem("wallet", JSON.stringify(data));
    setSession(data);
  }

  // Atualiza sessão manualmente
  function refresh() {
    const saved = localStorage.getItem("wallet");
    setSession(saved ? JSON.parse(saved) : null);
  }

  // Remove wallet
  function logout() {
    localStorage.removeItem("wallet");
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, saveWallet, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
