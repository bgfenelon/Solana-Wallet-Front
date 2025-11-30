


import styled from "styled-components";
import { Link } from "react-router-dom";

/* ------------------------------- */
/* PAGE CONTAINER */
/* ------------------------------- */
export const PageContainer = styled.div`
 background-color: #120720;
  min-height: 100vh;
  width: 100%;
  background: var(--background);
  color: var(--foreground);
  padding: 30px 20px;

  display: flex;
  justify-content: center;
`;

/* ------------------------------- */
/* CONTENT WRAPPER */
/* ------------------------------- */
export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
`;

/* ------------------------------- */
/* HEADER */
/* ------------------------------- */
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 20px 0;
  padding-left: 15vw;

  border-bottom: 1px solid rgba(157, 78, 221, 0.2);

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 40px;
      height: 40px;
    }

    h1 {
      font-size: 1.7rem;
      font-weight: 700;
      color: #e9d8ff;
    }
  }

  @media (max-width: 680px) {
    padding-left: 4vw;

    .brand h1 {
      font-size: 1.4rem;
    }
  }
`;

/* ------------------------------- */
/* BALANCE CARD */
/* ------------------------------- */
export const BalanceCard = styled.div`
  background: rgba(13, 5, 22, 0.65);
  border: 1px solid rgba(157, 78, 221, 0.35);
  padding: 28px;
  border-radius: 18px;
  margin-bottom: 36px;

  box-shadow: 0 0 14px rgba(157, 78, 221, 0.15);
`;

/* ------------------------------- */
/* BALANCE HEADER */
/* ------------------------------- */
export const BalanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    gap: 14px;
    align-items: center;
  }

  .iconBox {
    background: rgba(157, 78, 221, 0.25);
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(157, 78, 221, 0.4);

    .shield {
      width: 24px;
      height: 24px;
      color: #dcb9ff;
    }
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #e8d4ff;
  }

  .subtitle {
    font-size: 0.85rem;
    color: #bdaed8;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

/* ------------------------------- */
/* BALANCE VALUE */
/* ------------------------------- */
export const BalanceValue = styled.div`
  margin-top: 18px;
  font-size: 2.6rem;
  font-weight: 700;
  color: #ffffff;

  .currency {
    margin-left: 8px;
    font-size: 1rem;
    opacity: 0.75;
  }

  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

export const PasswordVisibity = styled.button`
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
`;
export const SwapButton = styled.button`
background: rgba(255, 255, 255, 0.05);
width: 100%;
padding: 40px ;
    border-radius: 18px;
        border: 1px solid rgba(157, 78, 221, 0.35);
`

/* ------------------------------- */
/* ACTION GRID */
/* ------------------------------- */
export const ActionGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

/* ------------------------------- */
/* ACTION BUTTON */
/* ------------------------------- */
export const ActionButton = styled(Link)`
  flex: 1;
  text-decoration: none;
  padding: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(157, 78, 221, 0.25);
  border-radius: 14px;
  text-align: center;
  transition: 0.15s ease;
  cursor: pointer;
  width: 100%;
  padding: 30px 0;

  &.grid-one{
  }

  &:hover {
    background: rgba(157, 78, 221, 0.18);
    transform: scale(0.97);
    box-shadow: 0 0 12px rgba(157, 78, 221, 0.2);
  }

  .title {
    margin-top: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #f7e8ff;
  }

  .subtitle {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-top: 4px;
    color: #d8c4ef;
  }
`;

export const ActionIcon = styled.div`
  width: 52px;
  height: 52px;
  margin: 0 auto;
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 26px;

  &.grid-one{
    background: rgba(157, 78, 221, 0.25);
        border: 1px solid rgba(157, 78, 221, 0.5);
            margin-bottom: 12px;
  }

  &.purple {
    background: rgba(157, 78, 221, 0.25);
    border: 1px solid rgba(157, 78, 221, 0.5);

    svg {
      color: #dcb9ff;
      width: 26px;
      height: 26px;
    }
  }
`;

/* ------------------------------- */
/* TRANSACTIONS TITLE */
/* ------------------------------- */
export const TxTitle = styled.h2`
  margin-top: 40px;
  font-size: 1.35rem;
  font-weight: 600;
  color: #faf1ff;
  margin-bottom: 16px;
`;

/* ------------------------------- */
/* TRANSACTION CARD */
/* ------------------------------- */
export const TxCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(157, 78, 221, 0.20);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 14px;

  transition: 0.15s ease;

  &:hover {
    background: rgba(157, 78, 221, 0.15);
  }

  p {
    color: #d7c7ef;
    font-size: 0.9rem;

    strong {
      color: #e9d6ff;
    }
  }
`;

/* ------------------------------- */
/* EMPTY STATE */
/* ------------------------------- */
export const EmptyText = styled.p`
  color: #b8a6d5;
  font-size: 0.95rem;
  margin-top: 8px;
`;

export const PaymentHistory = styled.div`

`
export const PaymentHeader = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
`

export const SeeMore = styled(Link)`
text-decoration: none;
font-size: small;
`
