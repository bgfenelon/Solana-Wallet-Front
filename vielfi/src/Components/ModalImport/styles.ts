import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(6px);
  display:flex; align-items:center; justify-content:center;
  z-index:999;
`;

export const ModalContainer = styled.div`
  background: var(--secondary);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  padding: 28px;
  border-radius: 14px;
  width: 100%;
  max-width: 480px;

  h2 {
    margin-bottom: 16px;
  }

  label {
    font-size: 14px;
    opacity: 0.9;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 12px 14px;
  border-radius: 8px;
  background: #111;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  margin: 8px 0 6px;
`;

export const CopyRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
`;

export const CopyButton = styled.button`
  padding: 6px 12px;
  background: var(--primary);
  border: none;
  color: white;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  &:hover { opacity: 0.85; }
`;

export const ConfirmRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;

  input {
    transform: scale(1.2);
  }
`;

export const ErrorMsg = styled.div`
  color: #ff3b3b;
  margin-bottom: 10px;
`;

export const Actions = styled.div`
  display:flex; gap:12px; justify-content:flex-end;
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  background: transparent;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  border-radius: 8px;
  cursor: pointer;
  &:hover { background: color-mix(in oklab, var(--primary) 10%, transparent); }
`;
