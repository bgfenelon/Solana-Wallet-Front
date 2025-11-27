// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Garante compatibilidade com libs antigas que tentam usar Buffer
      buffer: "buffer/",
    },
  },
  optimizeDeps: {
    include: ["buffer"],
  },
});
