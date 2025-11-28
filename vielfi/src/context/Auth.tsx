import React, { createContext, useContext, useEffect, useState } from "react";

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

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<WalletSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("wallet");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // 🔥 Garantir que o endereço salvo é válido
        if (parsed.walletAddress && parsed.walletAddress.length >= 30) {
          setSession(parsed);
        } else {
          console.warn("⚠️ Wallet inválida encontrada no localStorage. Limpando...");
          localStorage.removeItem("wallet");
        }
      } catch (err) {
        console.error("Erro ao carregar wallet", err);
      }
    }

    setLoading(false);
  }, []);

function saveWallet(data: WalletSession) {
  if (!data.walletAddress || data.walletAddress.length < 30) {
    console.error("❌ saveWallet recebeu um endereço inválido:", data.walletAddress);
    return; // <-- impede corromper a sessão
  }

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
