import { createContext, useContext, useState, ReactNode } from "react";
import { ToastContainer, ToastCard } from "./style";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface ToastContextType {
  showToast: (msg: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} type={toast.type}>
            {toast.type === "success" ? "✅" : "❌"} {toast.message}
          </ToastCard>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}
