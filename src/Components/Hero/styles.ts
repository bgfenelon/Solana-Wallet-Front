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
  min-height: 100vh;

  background: linear-gradient(135deg, #000000 0%, #360b69ff 50%, #000000 100%);
  height: calc(100vh - 120px);

  /* Responsivo */
  @media (max-width: 1024px) {
    padding-top: 120px;
  }

  @media (max-width: 768px) {
    min-height: 100%;
    padding-top: 10px;
    padding-left: 4%;
    padding-right: 4%;
    padding-bottom: 25%;
  }

  @media (max-width: 480px) {
    padding-top: 80px;
    padding-bottom: 30%;
  }
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
      linear-gradient(90deg, rgba(157, 78, 221, 0.1) 1px, transparent 1px);

    background-size: 50px 50px;

    /* Responsivo */
    @media (max-width: 480px) {
      background-size: 35px 35px;
    }
  }
`;

/* Container interno */
export const HeroInner = styled.div`
  width: 100%;
  max-width: ${sizes.maxWidth};
  margin: 0 auto;
  text-align: center;
  position: relative;

  @media (max-width: 768px) {
    max-width: 90%;
    padding-top: 20px;
  }
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

  box-shadow: 
    0 0 20px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);

  span {
    color: var(--muted-foreground);
    font-size: ${fontSizes.small};
  }

  /* Responsivo */
  @media (max-width: 480px) {
    padding: 6px 14px;
    span {
      font-size: 0.75rem;
    }
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

  /* Responsivo */
  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

  export const Contract = styled.button`
  background-color:transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: auto;
  margin-bottom: 20px;
  padding: 7px 15px;
  border-radius: 15px;
  background-color:  color-mix(in oklab, var(--primary) 50%, transparent);
  transition: all .5s;

  &:hover{
    transform: scale(1.1);
  }
  `;

  export const ContractContainer = styled.div`
  width:100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap:15px;
  margin: 20px 0;

  `


  export const ContractLink = styled.a`
  width:30px;
  height:30px;
  align-items: center;
  cursor: pointer;
  transition: all .5;

  &:hover{
    scale: (1.3);
  }

  img{
    display: block;
    width: 101%;
    max-width: 101%;
    border-radius: 100%;
  }
  `;

/* Subtítulo */
export const Subheading = styled.p`
  font-size: ${fontSizes.large};
  color: var(--muted-foreground);
  max-width: 700px;
  margin: 20px auto 48px auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
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

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

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

  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 0.9rem;
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

    .glow-icon {
      stroke: var(--primary);
      box-shadow: 
        0 0 20px rgba(157, 78, 221, 0.3),
        inset 0 0 20px rgba(157, 78, 221, 0.1);
    }
  }

  /* Responsivo */
  @media (max-width: 480px) {
    gap: 16px;

    div {
      font-size: 0.8rem;
    }
  }
`;
