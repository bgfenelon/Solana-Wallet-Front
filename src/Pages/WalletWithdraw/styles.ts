import styled from "styled-components";
import { fontSizes } from "../../styles";

export const Container = styled.section`
  min-height: 100vh;
  padding: 140px 24px 80px;
  background: linear-gradient(135deg, #000000, #1a0a2e, #000000);
`;

export const Card = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  padding: 40px;

  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);

  h1 {
    font-size: ${fontSizes.xlarge};
    color: var(--foreground);
    margin-bottom: 8px;
  }

  p {
    color: var(--muted-foreground);
    margin-bottom: 32px;
  }
`;

export const Field = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  font-size: ${fontSizes.small};
  color: var(--muted-foreground);
  display: block;
  margin-bottom: 6px;
`;

// 👇 AQUI ESTÁ A CORREÇÃO DO PROBLEMA
export const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 14px;
  border-radius: 10px;

  border: 1px solid
    ${({ $error }) =>
      $error
        ? "rgba(255, 70, 70, 0.9)"
        : "color-mix(in oklab, var(--primary) 25%, transparent)"};

  background: rgba(255, 255, 255, 0.05);
  color: var(--foreground);
  font-size: ${fontSizes.medium};

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 12px rgba(157, 78, 221, 0.35);
  }
`;
