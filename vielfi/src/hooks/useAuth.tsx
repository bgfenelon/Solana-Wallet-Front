import { createContext, useContext, useState } from "react";
import { postJSON, getJSON } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function importWallet(inputText) {
    try {
      const res = await postJSON("/auth/import", {
        input: inputText.trim(),
      });

      setUser({
        walletPubkey: res.walletPubkey,
      });

      return true;
    } catch (err) {
      console.error("Import wallet error:", err);
      throw err;
    }
  }

  async function loadSession() {
    try {
      const session = await getJSON("/session/me");
      if (session?.user) setUser(session.user);
    } catch (_) {}
  }

  return (
    <AuthContext.Provider value={{ user, importWallet, loadSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
