import QRCode from "react-qr-code";
import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--background);
  color: var(--foreground);
`;

/* NAVBAR FIXED + RESPONSIVA */
export const NavBar = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: left ;
    background: none;
    border: none;
    color: var(--muted-foreground);
    cursor: pointer;
    font-size: 16px;
    padding: 8px;
    flex: 1;

    &:hover {
      color: var(--foreground);
    }
  }

  h2 {
    flex: 1;
    font-size: 1.2rem;
    color: var(--foreground);
  }
`;

/* CONTAINER PRINCIPAL AJUSTADO */
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
    transition: 0.15s;

    &:hover {
      background: rgba(157, 78, 221, 0.4);
      transform: scale(0.97);
    }
  }
`;

/* QR CODE RESPONSIVO + CENTRALIZADO */
export const QrWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const QRCodeStyle = styled(QRCode)`
  border: 16px solid white;
  border-radius: 10px;

  @media (max-width: 480px) {
    width: 140px !important;
    height: 140px !important;
    border-width: 10px;
  }
`;

/* ENDEREÇO */
export const AddrBox = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 0.85rem;
  word-break: break-all;
  margin-bottom: 12px;
  color: #d6c9f7;
  border: 1px solid rgba(157, 78, 221, 0.3);

  @media (max-width: 480px) {
    font-size: 0.78rem;
  }
`;
