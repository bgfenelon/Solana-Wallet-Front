

import styled from "styled-components";
import { sizes, fontSizes } from "../../styles";

/* Container principal do Hero */
export const MainHeroContent = styled.section`
  position: relative;
  padding-top: 150px; 
  padding-bottom: 20%;
  padding-left: 6%;
  padding-right: 6%;
  width: 100%;
  overflow: hidden;
  min-height: 90vh;

  /* Gradiente principal */
  background: linear-gradient(
    135deg,
    #000000 0%,
    #360b69ff 50%,
    #000000 100%
  );
  height: calc(100vh - 120px);
`;

/* Grid animado do background */
export const BackgroundGrid = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
  

  > div {
    position: absolute;
    inset: 0;

    background-image: linear-gradient(
        rgba(157, 78, 221, 0.1) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(157, 78, 221, 0.1) 1px,
        transparent 1px
      );

    background-size: 50px 50px;
  }
`;

/* Container interno */
export const HeroInner = styled.div`
  width: 100%;
  max-width: ${sizes.maxWidth};
  margin: 0 auto;
  text-align: center;
  position: relative;
`;

/* Badge */
export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 8px 16px;
  margin-bottom: 32px;

  border-radius: 999px;

  background: color-mix(in oklab, var(--primary) 10%, transparent);
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);

  /* Glow */
  box-shadow: 
    0 0 20px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);

  span {
    color: var(--muted-foreground);
    font-size: ${fontSizes.small};
  }
`;

/* Título principal */
export const MainHeading = styled.h1`
  font-weight: bold;
  font-size: ${fontSizes.xxlarge};
  margin-bottom: 24px;
  line-height: 1.2;
  text-wrap: balance;

  span {
    &.primary {
      color: var(--primary);
      text-shadow:
        0 0 20px rgba(157, 78, 221, 0.5),
        0 0 40px rgba(157, 78, 221, 0.3),
        0 0 60px rgba(157, 78, 221, 0.2);
    }

    &.white {
      color: #ffffff;
    }
  }
`;

/* Subtítulo */
export const Subheading = styled.p`
  font-size: ${fontSizes.medium};
  color: var(--muted-foreground);
  max-width: 720px;
  margin: 0 auto 48px auto;
  line-height: 1.6;
`;

/* Container dos botões */
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 48px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

/* Botão primário */


/* Botão secundário */
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
`;

/* Lista de features */
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
    
    
    .glow-icon{
    stroke: var(--primary);
    box-shadow: 
    0 0 20px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);

    }
  }
`;
