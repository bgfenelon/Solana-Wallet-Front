import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    console.warn("⚠ useAuth foi usado fora do AuthProvider");
    return {
      session: null,
      saveWallet: () => {},
      logout: () => {},
      refresh: async () => {},
      loading: true,
    };
  }

  return ctx;
}
