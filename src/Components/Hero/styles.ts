import styled from "styled-components";
import { sizes, fontSizes } from "../../styles";

/* Container principal do Hero */
export const MainHeroContent = styled.section`
  position: relative;
  padding-bottom: 20%;
  padding-left: 6%;
  padding-right: 6%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  img{
    width: 150px;
  }
  h1{
    font-size: 2em;
  }

  background: linear-gradient(135deg, #000000 0%, #360b69ff 50%, #000000 100%);

  /* Responsivo */
  @media (max-width: 1024px) {
    padding-top: 120px;
  }

  @media (max-width: 768px) {
    min-height: 100%;
    padding-top: 80px;
    padding-left: 4%;
    padding-right: 4%;
    padding-bottom: 25%;
    height: 100%;
    h1{
    font-size: 1.7em;
  }
    img{
    width: 100px;
  }
    
  }

  @media (max-width: 480px) {
    padding-top: 80px;
    padding-bottom: 30%;
    h1{
      font-size: 28px;
    }
  }
      img{
    width: 80px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  margin-top: 70px;

  @media (max-width: 768px) {
    max-width: 90%;
    padding-top: 20px;
    height: 100%;
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
    word-wrap: break-word;
    max-width: 400px;
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
  background: color-mix(in oklab, var(--primary) 50%, transparent);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  word-break: break-word;

  margin: 0 auto 25px auto;
  padding: 8px 18px;

  border-radius: 14px;
  transition: transform .3s;

  h6 {
    font-size: 0.85rem;
    color: white;
    text-align: center;
    font-weight: 500;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 6px 14px;
    margin-bottom: 32px;
    max-width: 400px;


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
word-break: break-all;
  width: 42px;
  height: 42px;

  cursor: pointer;
  transition: transform .25s ease;

  &:hover {
    transform: scale(1.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
    display: block;
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
