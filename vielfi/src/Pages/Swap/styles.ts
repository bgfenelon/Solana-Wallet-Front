import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 28px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--background);
  color: var(--foreground);
`;

export const Box = styled.div`
  width: 100%;
  max-width: 640px;
  background: rgba(13, 5, 22, 0.6);
  border: 1px solid rgba(157, 78, 221, 0.3);
  padding: 26px;
  border-radius: 16px;
  backdrop-filter: blur(4px);

  h2 {
    text-align: center;
    margin-bottom: 18px;
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

export const PriceBox = styled.div`
  background: rgba(157, 78, 221, 0.15);
  border: 1px solid rgba(157, 78, 221, 0.35);
  padding: 14px 18px;
  border-radius: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;

  strong {
    display: block;
    margin-top: 4px;
    font-size: 1.1rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;

  button {
    flex: 1;
    padding: 12px 0;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: #cfc6e6;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.15s ease;
  }

  button:hover {
    background: rgba(157, 78, 221, 0.25);
  }

  .active {
    background: rgba(157, 78, 221, 0.35);
    border-color: rgba(157, 78, 221, 0.65);
    color: #fff;
    font-weight: 600;
  }
`;

export const InputBox = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    margin-bottom: 6px;
    color: #cfc6e6;
    font-size: 0.95rem;
  }

  input {
    width: 100%;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.03);
    color: var(--foreground);
    font-size: 1.05rem;
    transition: 0.12s ease;
  }

  input:focus {
    outline: none;
    border-color: #9d4edd;
    background: rgba(157, 78, 221, 0.15);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px 0;
  background: linear-gradient(90deg, #9d4edd, #7c3aed);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.15s ease;
  margin-top: 6px;

  &:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: scale(0.97);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
`;

export const ResultBox = styled.div`
  margin-top: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 14px 16px;
  border-radius: 12px;
  color: #e0d2ff;
  font-size: 0.92rem;
  text-align: center;
  word-break: break-all;
`;
