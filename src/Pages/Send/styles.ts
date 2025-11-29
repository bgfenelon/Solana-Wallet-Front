// src/Pages/Send/styles.ts
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
  padding: 24px;
  border-radius: 16px;
`;

export const Field = styled.div`
  margin-bottom: 14px;

  label {
    display: block;
    font-size: 0.85rem;
    color: #cfc6e6;
    margin-bottom: 6px;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.02);
    color: var(--foreground);
    font-size: 0.95rem;
  }

  .mono {
    font-family: "Menlo", "Courier New", monospace;
    background: rgba(255, 255, 255, 0.02);
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.04);
  }

  button.quick {
    background: rgba(157, 78, 221, 0.18);
    border: 1px solid rgba(157, 78, 221, 0.5);
    color: #f3e9ff;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
  }

  button.info {
    background: transparent;
    border: 1px dashed rgba(255, 255, 255, 0.06);
    color: #ddd;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
  }

  button.primary {
    background: linear-gradient(90deg, #9d4edd, #7c3aed);
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
  }

  button.secondary {
    background: transparent;
    color: #cfc6e6;
    border: 1px solid rgba(255, 255, 255, 0.04);
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
  }
`;
