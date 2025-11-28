import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 🔥 Removido qualquer polyfill, pq quebra tudo no Vite moderno

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Se precisar do buffer: 
      buffer: "buffer/",
    },
  },
  define: {
    global: {},
  }
});
