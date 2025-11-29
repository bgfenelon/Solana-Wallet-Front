import styled from "styled-components";
import { fontSizes } from "../../styles";

export const Container = styled.section`
  min-height: 100vh;
  padding: 140px 24px 80px;
  background: linear-gradient(135deg, #000, #1a0a2e, #000);
`;

export const Card = styled.div`
  max-width: 650px;
  margin: 0 auto;
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  padding: 40px;
  text-align: center;
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);

  h1 {
    font-size: ${fontSizes.xlarge};
    color: var(--foreground);
  }

  p {
    color: var(--muted-foreground);
    margin-bottom: 30px;
  }
`;

export const Empty = styled.div`
  padding: 40px;
  font-size: ${fontSizes.medium};
  color: var(--muted-foreground);
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Item = styled.div<{ $type: "deposit" | "withdraw" }>`
  background: rgba(255,255,255,0.05);
  padding: 18px;
  border-radius: 12px;
  border: 1px solid
    ${({ $type }) =>
      $type === "deposit"
        ? "color-mix(in oklab, #00ff9d 35%, transparent)"
        : "color-mix(in oklab, #ff4d4d 40%, transparent)"};

  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    flex-direction: column;
    text-align: left;

    strong {
      color: var(--foreground);
      font-size: ${fontSizes.medium};
    }

    span {
      font-size: ${fontSizes.medium};
      color: var(--primary);
    }

    small {
      font-size: ${fontSizes.small};
      color: var(--muted-foreground);
      margin-top: 4px;
    }
  }

  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    font-size: ${fontSizes.small};
  }
`;
