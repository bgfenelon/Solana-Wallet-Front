import styled from "styled-components";
import { sizes, fontSizes } from "../../styles";

/* ================================
   MAIN HERO CONTAINER
================================ */
export const MainHeroContent = styled.section`
  position: relative;
  padding-left: 6%;
  padding-right: 6%;
  width: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 80vh;
  max-height: 760px;

  background: linear-gradient(135deg, #000000 0%, #360b69ff 50%, #000000 100%);

  img {
    width: 150px;
    transition: 0.3s ease;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.2;
    transition: 0.3s ease;
  }

  /* === 1400–1200px === */
  @media (max-width: 1400px) {
    max-height: 720px;

    img {
      width: 200px;
    }

    h1 {
      font-size: 2.2rem;
    }
  }

  /* === 1200px === */
  @media (max-width: 1200px) {
    padding-top: 90px;
    max-height: 680px;

    img {
      width: 180px;
    }

    h1 {
      font-size: 2rem;
    }
  }

  /* === 1024px === */
  @media (max-width: 1024px) {
    padding-top: 110px;

    img {
      width: 160px;
    }

    h1 {
      font-size: 1.85rem;
    }
  }

  /* === 900px === */
  @media (max-width: 900px) {
    padding-top: 120px;

    img {
      width: 140px;
    }

    h1 {
      font-size: 1.75rem;
    }
  }

  /* === 768px === */
  @media (max-width: 768px) {
    min-height: auto;
    height: auto;

    padding-top: 80px;
    padding-left: 4%;
    padding-right: 4%;
    padding-bottom: 20%;

    img {
      width: 110px;
    }

    h1 {
      font-size: 1.55rem;
    }
  }

  /* === 480px === */
  @media (max-width: 480px) {
    padding-top: 70px;
    padding-bottom: 28%;

    img {
      width: 85px;
    }

    h1 {
      font-size: 1.35rem;
    }
  }
`;

/* ================================
   GRID DO BACKGROUND
================================ */
export const BackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;

    background-image: linear-gradient(
        rgba(157, 78, 221, 0.1) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(157, 78, 221, 0.1) 1px, transparent 1px);

    @media (max-width: 480px) {
      background-size: 35px 35px;
    }
  }
`;

/* ================================
   HERO INNER
================================ */
export const HeroInner = styled.div`
  width: 100%;
  max-width: ${sizes.maxWidth};
  margin: 0 auto;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    max-width: 90%;
  }

  @media (max-width: 768px) {
    max-width: 92%;
    padding-top: 10px;
  }
`;

/* ================================
   BADGE
================================ */
export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 16px;
  margin-bottom: 32px;

  border-radius: 999px;

  background: color-mix(in oklab, var(--primary) 10%, transparent);
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);

  box-shadow:
    0 0 20px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);

  span {
    color: var(--muted-foreground);
    font-size: ${fontSizes.small};
  }

  @media (max-width: 480px) {
    max-width: 400px;
    padding: 6px 14px;

    span {
      font-size: 0.75rem;
    }
  }
`;

/* ================================
   MAIN HEADING
================================ */
export const MainHeading = styled.h1`
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 1.22;

  span.primary {
    color: var(--primary);
    text-shadow:
      0 0 18px rgba(157, 78, 221, 0.5),
      0 0 30px rgba(157, 78, 221, 0.3);
  }

  @media (max-width: 1400px) {
    font-size: 2.2rem;
  }

  @media (max-width: 1200px) {
    font-size: 2rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.85rem;
  }

  @media (max-width: 900px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 1.55rem;
  }

  @media (max-width: 480px) {
    font-size: 1.35rem;
  }
`;

/* ================================
   CONTRACT BUTTON
================================ */
export const Contract = styled.button`
  background: color-mix(in oklab, var(--primary) 50%, transparent);
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin: 0 auto 25px auto;
  padding: 8px 18px;

  border-radius: 14px;
  transition: transform 0.3s;

  h6 {
    font-size: 0.85rem;
    color: white;
    font-weight: 500;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 6px 14px;
    margin-bottom: 32px;

    h6 {
      font-size: 0.78rem;
    }
  }
`;

export const ContractContainer = styled.div`
  width: 100%;
  word-break: break-all;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;

  margin: 15px 0 10px 0;

  @media (max-width: 768px) {
    gap: 16px;
    margin: 20px 0 12px 0;
  }

  @media (max-width: 480px) {
    gap: 14px;
    margin: 28px 0 15px 0;
  }
`;

export const ContractLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 42px;
  height: 42px;

  cursor: pointer;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

/* ================================
   SUBHEADING
================================ */
export const Subheading = styled.p`
  font-size: ${fontSizes.medium};
  color: var(--muted-foreground);
  max-width: 700px;
  margin: 0px auto 48px auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

/* ================================
   BUTTONS CONTAINER
================================ */
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  align-items: center;
  justify-content: center;

  margin-bottom: 48px;

  @media (min-width: 640px) {
    flex-direction: row;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

/* ================================
   SECONDARY BUTTON
================================ */
export const SecondaryButton = styled.button`
  padding: 16px 32px;
  font-size: ${fontSizes.medium};
  color: #ffffff;
  font-weight: 600;

  border-radius: 8px;
  cursor: pointer;

  background: transparent;
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);

  &:hover {
    background: color-mix(in oklab, var(--primary) 10%, transparent);
  }

  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 0.9rem;
  }
`;

/* ================================
   FEATURES
================================ */
export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    gap: 8px;

    color: var(--muted-foreground);
    font-size: ${fontSizes.small};

    .glow-icon {
      stroke: var(--primary);
      box-shadow:
        0 0 20px rgba(157, 78, 221, 0.3),
        inset 0 0 20px rgba(157, 78, 221, 0.1);
    }
  }

  @media (max-width: 480px) {
    gap: 16px;

    div {
      font-size: 0.8rem;
    }
  }
`;
