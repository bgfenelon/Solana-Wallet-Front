import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
  color: var(--foreground);
`;

export const Box = styled.div`
  background: rgba(13, 5, 22, 0.6);
  border: 1px solid rgba(157, 78, 221, 0.3);
  padding: 28px;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  text-align: center;

  h1 {
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 18px;
    color: #b7b3c7;
  }

  .copy {
    margin-top: 14px;
    background: rgba(157, 78, 221, 0.25);
    border: 1px solid rgba(157, 78, 221, 0.6);
    color: #e7dbff;
    padding: 10px 18px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.95rem;

    &:hover {
      background: rgba(157, 78, 221, 0.4);
      transform: scale(0.97);
    }
  }
`;

export const QrWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
`;

export const AddrBox = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  word-break: break-all;
  margin-bottom: 12px;
  color: #d6c9f7;
  border: 1px solid rgba(157, 78, 221, 0.3);
`;
