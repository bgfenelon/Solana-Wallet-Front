import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth"; // assumes src/context/Auth.tsx exports named AuthProvider

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Elemento #root não encontrado");
const root = ReactDOM.createRoot(rootEl);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
