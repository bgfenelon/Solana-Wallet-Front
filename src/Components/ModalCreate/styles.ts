import styled from "styled-components";
import { PrimaryButton } from "../../styles";

interface ModalProps {
  error?: boolean;
}

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: #120720d0;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 16px; /* Permite respiração em telas pequenas */
`;

export const ModalContainer = styled.div<ModalProps>`
  background: var(--secondary);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  padding: 32px;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto; /* SCROLL NO CELULAR */
  
  ${({ error }) =>
    error &&
    `
      border-color: #ff3b3b !important;
      animation: shake 0.3s ease;
    `
  }

  /* MOBILE */
  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 12px;

    h2 {
      font-size: 22px;
    }
    h3 {
      font-size: 16px;
    }
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    20% { transform: translateX(-4px); }
    40% { transform: translateX(4px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
    100% { transform: translateX(0); }
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: #111;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;

export const SeedHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;

  button {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    padding: 6px 12px;
    border-radius: 8px;
    color: var(--foreground);
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: rgba(255,255,255,0.18);
    }

    @media (max-width: 480px) {
      padding: 5px 10px;
      font-size: 12px;
    }
  }
`;

export const SeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const SeedWordBox = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 12px;
  border-radius: 10px;
  display: flex;
  gap: 6px;
  align-items: center;
  color: var(--foreground);
  font-size: 15px;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 13px;
  }

  .index {
    opacity: 0.7;
  }

  .word {
    font-weight: 500;
  }
`;

export const CheckRow = styled.div`
  display: flex;
  align-items: start;
  gap: 10px;
  margin-bottom: 20px;

  label {
    color: var(--foreground);
    font-size: 0.8rem;
    font-weight: 200;
    margin-top: -4px;

    @media (max-width: 480px) {
      font-size: 0.7rem;
    }
  }
`;

export const ErrorMsg = styled.div`
  color: #ff3b3b;
  font-size: 0.9rem;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  background: transparent;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: rgba(255,255,255,0.05);
  }

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 13px;
  }
`;

export const PrimaryButtonStyled = styled(PrimaryButton)`
  padding: 12px 20px;

  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 14px;
  }
`;
