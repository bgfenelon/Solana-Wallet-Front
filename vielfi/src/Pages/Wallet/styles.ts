import styled from "styled-components";
import { fontSizes, sizes } from "../../styles";

export const Container = styled.section`
  min-height: 100vh;
  padding: 140px 24px 80px;
  background: linear-gradient(135deg, #000, #1a0a2e, #000);
`;

export const Card = styled.div`
  margin: 0 auto;
  max-width: 600px;
  background: var(--secondary);
  border-radius: 20px;
  padding: 40px;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);

  box-shadow:
    0 0 25px rgba(157, 78, 221, 0.3),
    inset 0 0 18px rgba(157, 78, 221, 0.15);

  text-align: center;

  h1 {
    font-size: ${fontSizes.xlarge};
    color: var(--foreground);
  }

  h2 {
    font-size: ${fontSizes.large};
    color: var(--primary);
    margin-top: 8px;
    margin-bottom: 32px;
  }
`;

export const BalanceBox = styled.div`
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 20px 16px;
  margin-bottom: 32px;

  span {
    font-size: ${fontSizes.small};
    color: var(--muted-foreground);
  }

  strong {
    display: block;
    font-size: 2rem;
    margin-top: 8px;
    color: var(--foreground);
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const SecondaryButton = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  color: var(--foreground);
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: color-mix(in oklab, var(--primary) 10%, transparent);
  }
`;

export const Info = styled.div`
  background: color-mix(in oklab, var(--secondary) 12%, transparent);
  border: 1px solid color-mix(in oklab, var(--primary) 18%, transparent);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  word-break: break-all;

  strong {
    display: block;
    font-size: ${fontSizes.small};
    color: var(--muted-foreground);
    margin-bottom: 6px;
  }

  p {
    margin: 0;
    font-size: ${fontSizes.medium};
    color: var(--foreground);
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
`;