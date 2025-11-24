import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContainer = styled.div`
  background: var(--secondary);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  padding: 32px;
  border-radius: 16px;
  max-width: 460px;
  width: 100%;
  box-shadow:
    0 0 30px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);

  h2 {
    color: var(--foreground);
    margin-bottom: 12px;
    font-size: 1.8rem;
  }

  p {
    color: var(--muted-foreground);
    margin-bottom: 16px;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  height: 120px;
  border-radius: 10px;
  background: #131313;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  font-size: 1rem;
  resize: none;
  margin-bottom: 24px;

  &:focus {
    outline: 2px solid var(--primary);
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  background: transparent;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: color-mix(in oklab, var(--primary) 10%, transparent);
  }
`;
