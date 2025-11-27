// src/Pages/Deposit/styles.ts
import styled from "styled-components";
import { fontSizes } from "../../styles";

export const Container = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000, #1a0a2e, #000);
`;

export const Card = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  padding: 40px;
  text-align: center;
  border: 1px solid color-mix(in oklab, var(--primary) 25%, transparent);

  box-shadow:
    0 0 25px rgba(157, 78, 221, 0.25),
    inset 0 0 15px rgba(157, 78, 221, 0.1);

  h1 {
    font-size: ${fontSizes.xlarge};
    color: var(--foreground);
    margin-bottom: 8px;
  }

  p {
    font-size: ${fontSizes.medium};
    color: var(--muted-foreground);
    margin-bottom: 28px;
  }
`;

export const QRWrapper = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);


  SVG{
    border: 10px solid  white;
  border-radius: 12px;

  }
`;

export const AddressBox = styled.div`

  margin-top: 20px;
  padding: 18px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);

  strong {
    display: block;
    margin-bottom: 10px;
    font-size: ${fontSizes.medium};
    color: var(--primary);
  }

  p {
    margin: 0;
    word-break: break-all;
    color: var(--foreground);
  }
`;

export const CopyButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #b026ff, #7d00ff, #5500c8);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 0 18px rgba(157, 78, 221, 0.35);
`;

export const InfoText = styled.p`
  margin-top: 20px;
  font-size: ${fontSizes.small};
  color: var(--muted-foreground);
`;

export const ErrorBox = styled.div`
  margin: 24px auto;
  max-width: 480px;
  background: rgba(255, 20, 20, 0.04);
  border: 1px solid rgba(255, 60, 60, 0.12);
  color: #ffb3b3;
  padding: 16px;
  border-radius: 12px;
`;
