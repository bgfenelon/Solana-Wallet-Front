// src/components/PrivacyFeatures/styles.ts
import styled from "styled-components";
import { sizes, fontSizes } from "../../styles";

/* SECTION ROOT */
export const Section = styled.section`
  min-height: 100vh;
  padding: 96px 24px;
  background: linear-gradient(
    135deg,
    #000000 0%,
    #1a0a2e 50%,
    #000000 100%
  );
  display: flex;
  align-items: center;
`;

/* CONTAINER */
export const Container = styled.div`
  margin: 0 auto;
  max-width: ${sizes.maxWidth};
  width: 100%;
`;

/* HEADER */
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
    max-width: 680px;
    margin: 0 auto;
  }
`;

/* GRID */
export const FeaturesGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 80px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* CARD */
export const Card = styled.div`
  padding: 32px;
  border-radius: 24px;
  background: color-mix(in oklab, var(--secondary) 50%, transparent);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);

  transition: 0.3s ease;

  &:hover {
    background: var(--secondary);
    border-color: color-mix(in oklab, var(--primary) 40%, transparent);
  }
`;

/* ICON WRAPPER */
export const IconWrap = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 16px;
  margin-bottom: 24px;

  background: color-mix(in oklab, var(--primary) 20%, transparent);
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);

  /* glow */
  filter: drop-shadow(0 0 12px color-mix(in oklab, var(--primary) 40%, transparent));

  transition: transform 0.3s;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

/* TITLE */
export const Title = styled.h3`
  font-size: ${fontSizes.large};
  font-weight: bold;
  color: var(--foreground);
  margin-bottom: 12px;
  transition: color 0.3s;

  ${Card}:hover & {
    color: var(--primary);
  }
`;

/* DESCRIPTION */
export const Description = styled.p`
  color: var(--muted-foreground);
  line-height: 1.6;
`;

/* CTA BOX */
export const CTA = styled.div`
  background: color-mix(in oklab, var(--secondary) 50%, transparent);
  border: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  border-radius: 32px;

  padding: 48px;
  text-align: center;

  box-shadow:
    0 0 20px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);

  h3 {
    font-size: ${fontSizes.xlarge};
    font-weight: bold;
    color: var(--foreground);
    margin-bottom: 16px;
  }

  p {
    font-size: ${fontSizes.large};
    color: var(--muted-foreground);
    max-width: 520px;
    margin: 0 auto 32px auto;
  }
`;
