import QRCode from "react-qr-code";
import styled from "styled-components";

/* =========================
   LAYOUT PRINCIPAL
========================= */

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  background: #020202;
  color: var(--foreground);
  display: flex;
  justify-content: ;
  align-items: center;
  flex-direction: column;
  grid-template-rows: 80px 1fr;

  @media (max-width: 768px) {
    padding: 12px;
    grid-template-rows: 70px 1fr;
  }

  @media (min-width: 1400px) {
    max-width: 1400px;
  }
`;

/* =========================
   NAVBAR
========================= */

export const NavBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 12px;
  margin-bottom: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: left;
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

/* =========================
   BOX PRINCIPAL
========================= */

export const Box = styled.div`
  background: #06060680;
  border: 1px solid rgba(157, 78, 221, 0.3);
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: 520px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  p {
    font-size: 0.9rem;
    margin-bottom: 12px;
    color: #b7b3c7;
  }

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

/* =========================
   BOTÕES
========================= */

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const CoinButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 12px;
  background-color: #1616164d;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;

  &:hover {
    background: rgba(157, 78, 221, 0.4);
    border: 1px solid var(--primary);
  }

  &.selected {
    background-color: var(--primary);
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
  }
`;

/* =========================
   QR CODE
========================= */

export const QrWrapper = styled.div`
  margin: 24px 0;
  display: flex;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;

  @media (max-width: 480px) {
    padding: 8px;
    margin: 16px 0;
  }
`;

export const QRCodeStyled = styled(QRCode)`
  border: 16px solid white;
  border-radius: 16px;

  @media (max-width: 480px) {
    width: 140px !important;
    height: 140px !important;
    border-width: 10px;
  }
`;
export const CopyButton = styled.button`
  background: var(--primary);
  border: 1px solid rgba(157, 78, 221, 0.6);
  color: #e7dbff;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;

  display: flex;
  align-items: center;
  gap: 8px;

  transition: 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(157, 78, 221, 0.4);
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

/* =========================
   COPY ROW
========================= */

export const CopyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const AddrBox = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 10px 14px;
  border-radius: 10px;
  width: 100%;
  font-size: 0.85rem;
  word-break: break-all;
  color: #d6c9f7;
  border: 1px solid rgba(157, 78, 221, 0.3);

  @media (max-width: 480px) {
    font-size: 0.78rem;
  }
`;

/* =========================
   CARDS INFORMATIVOS
========================= */

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  max-width: 520px;   /* 🔥 MESMA LARGURA DO BOX */
  
  margin-top: 10px;
  padding: 15px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid #16161680;

  &:hover {
    border-color: rgba(157, 78, 221, 0.3);
  }

  h6 {
    font-size: 12px;
  }

  p {
    font-weight: 100;
    font-size: 10px;
    letter-spacing: 0.5px;
  }

  .fontDiv {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    padding: 12px;

    p {
      font-size: 9px;
    }
  }
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30%;
`;

/* =========================
   COMING SOON
========================= */

export const ComingSoon = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ComingSoonTitle = styled.h5`
  font-size: 20px;
  text-align: center;
  width: 100%;
  padding: 40px;

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 24px;
  }
`;
