import React, { createContext, useContext, useEffect, useState } from "react";

type SessionData = {
  walletAddress: string | null;
  walletSecret: number[] | null;
};

type AuthContextType = {
  session: SessionData | null;
  loading: boolean;
  setSession: (data: SessionData | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  setSession: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===========================================================
      SALVAR SESSÃO NO LOCALSTORAGE
  ============================================================ */
  function setSession(data: SessionData | null) {
    setSessionState(data);

    if (data) {
      localStorage.setItem("veilfi_session", JSON.stringify(data));
    } else {
      localStorage.removeItem("veilfi_session");
    }
  }

  /* ===========================================================
      LOGOUT
  ============================================================ */
  function logout() {
    setSession(null);
  }

  /* ===========================================================
      RESTAURAR SESSÃO AO INICIAR A PÁGINA
  ============================================================ */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("veilfi_session");

      if (saved) {
        const parsed = JSON.parse(saved);

        setSessionState({
          walletAddress: parsed.walletAddress || null,
          walletSecret: parsed.walletSecret || null,
        });
      }
    } catch (err) {
      console.error("Failed to restore saved session", err);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
