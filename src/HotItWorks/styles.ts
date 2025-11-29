import styled from "styled-components";
import { sizes, fontSizes } from "../styles";

export const Section = styled.section`
  height: 100vh;
  padding: 96px 24px;
  background: var(--background);
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: ${sizes.maxWidth || "1200px"};
  width: 100%;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 64px;

  h2 {
    font-size: ${fontSizes.xxlarge};
    font-weight: bold;
    color: var(--foreground);
    margin-bottom: 16px;
  }

  p {
    font-size: ${fontSizes.large};
    color: var(--muted-foreground);
  }
`;

export const StepsGrid = styled.div`
  display: grid;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StepCard = styled.div`
  position: relative;

  padding: 32px;
  border-radius: 24px;

  background: var(--secondary);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);

  transition: 0.35s ease;

  &:hover {
    border-color: color-mix(in oklab, var(--primary) 40%, transparent);
  }
`;

export const NumberBadge = styled.div`
  width: 64px;
  height: 64px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 24px;

  border-radius: 20px;

  background: linear-gradient(
    135deg,
    var(--primary),
    #6b2ddf
  );

  box-shadow:
    0 0 20px color-mix(in oklab, var(--primary) 40%, transparent),
    inset 0 0 20px color-mix(in oklab, var(--primary) 20%, transparent);

  span {
    font-size: 32px;
    font-weight: bold;
    color: white;
    text-shadow:
      0 0 20px rgba(157, 78, 221, 0.5),
      0 0 40px rgba(157, 78, 221, 0.3);
  }
`;

export const StepTitle = styled.h3`
  font-size: ${fontSizes.large};
  font-weight: bold;
  color: var(--foreground);
  margin-bottom: 16px;
  transition: color 0.3s;

  ${StepCard}:hover & {
    color: var(--primary);
  }
`;

export const StepDescription = styled.p`
  color: var(--muted-foreground);
  line-height: 1.6;
`;

export const Overlay = styled.div<{ gradient: string }>`
  position: absolute;
  inset: 0;
  border-radius: 24px;
  opacity: 0;

  background: ${({ gradient }) => gradient};

  transition: opacity 0.3s;

  ${StepCard}:hover & {
    opacity: 1;
  }
`;
