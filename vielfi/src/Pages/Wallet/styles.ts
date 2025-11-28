// src/Pages/Wallet/styles.ts
import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: var(--background);
  color: var(--foreground);
  padding: 28px;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 760px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      width: 34px;
      height: 34px;
    }

    h1 {
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
`;

export const BalanceCard = styled.div`
  background: rgba(13, 5, 22, 0.65);
  border: 1px solid rgba(157, 78, 221, 0.35);
  padding: 26px;
  border-radius: 18px;
  margin-bottom: 36px;
`;

export const BalanceHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .iconBox {
    background: rgba(157, 78, 221, 0.2);
    padding: 10px;
    border-radius: 12px;

    .shield {
      width: 22px;
      height: 22px;
      color: #caa8ff;
    }
  }

  .title {
    font-size: 1.05rem;
    font-weight: 600;
  }

  .subtitle {
    font-size: 0.8rem;
    color: #bdaed8;
  }

  .right button {
    border: none;
    background: transparent;
    cursor: pointer;

    .eye {
      width: 22px;
      height: 22px;
      color: #caa8ff;
    }
  }
`;

export const BalanceValue = styled.div`
  margin-top: 16px;
  font-size: 2.4rem;
  font-weight: 700;

  .currency {
    margin-left: 8px;
    font-size: 1rem;
    opacity: 0.8;
  }
`;

export const ActionGrid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
`;

export const ActionButton = styled(Link)`
  text-decoration: none;
  padding: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  text-align: center;
  transition: 0.15s ease;
  cursor: pointer;

  &:hover {
    background: rgba(157, 78, 221, 0.25);
    transform: scale(0.97);
  }

  .title {
    margin-top: 10px;
    font-size: 1.05rem;
    font-weight: 600;
  }

  .subtitle {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-top: 4px;
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

  &.purple {
    background: rgba(157, 78, 221, 0.25);
    border: 1px solid rgba(157, 78, 221, 0.5);

    svg {
      color: #dcb9ff;
      width: 24px;
      height: 24px;
    }
  }
`;
