// src/Components/ModalImport/styles.ts
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ModalContainer = styled.div`
  background: var(--secondary);
  padding: 28px;
  border-radius: 16px;
  width: 100%;
  max-width: 460px;
  border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

/* 🔥 CORRIGIDO: era Input, agora é TextArea */
export const TextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  resize: none;

  background: #101010;
  border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent);
  color: var(--foreground);

  border-radius: 10px;
  padding: 14px;
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

export const ErrorMsg = styled.p`
  color: #ff5b5b;
  font-size: 0.9rem;
  margin-bottom: 14px;
  text-align: center;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-top: 10px;
`;

export const SecondaryButton = styled.button`
  flex: 1;
  padding: 14px;
  border: 1px solid color-mix(in srgb, var(--primary) 30%, transparent);
  border-radius: 10px;
  background: #181818;
  color: var(--foreground);
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #222;
  }
`;
