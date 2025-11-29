import styled, { keyframes } from "styled-components";

export const fadeSlide = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
`;

export const ToastCard = styled.div<{ type: "success" | "error" }>`
  padding: 14px 16px;
  min-width: 220px;
  color: white;
  border-radius: 10px;
  animation: ${fadeSlide} 0.25s ease forwards;

  background: ${(p) =>
    p.type === "success"
      ? "linear-gradient(90deg, #37d67a, #1fa15e)"
      : "linear-gradient(90deg, #ff4e50, #d72638)"};

  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
`;