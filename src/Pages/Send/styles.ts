import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #020202;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 14px;
  }
`;

export const BalanceCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: #060606;
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const BalanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .iconBox {
    background: rgba(157, 78, 221, 0.2);
    padding: 10px;
    border-radius: 12px;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 11px;
    color: #aaa;
  }
`;

export const BalanceValue = styled.div`
  margin-top: 16px;
  font-size: 28px;
  font-weight: bold;

  .currency {
    font-size: 14px;
    margin-left: 6px;
  }
`;

export const PasswordVisibity = styled.div`
  cursor: pointer;
`;

export const TokenMiniRow = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;

  .tokenBox {
    flex: 1;
    background: #0c0c0c;
    padding: 10px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    font-size: 13px;

    img {
      width: 18px;
    }
  }
`;

export const Box = styled.div`
  width: 100%;
  max-width: 520px;
  background: #060606;
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 20px;
  padding: 20px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

  label {
    font-size: 12px;
    margin-bottom: 6px;
    color: #ccc;
  }

  input,
  select {
    background: #0c0c0c;
    border: 1px solid rgba(157, 78, 221, 0.3);
    border-radius: 10px;
    padding: 10px;
    color: white;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: var(--primary);
    }
  }
`;

export const AmountRow = styled.div`
  display: flex;
  gap: 8px;

  input {
    flex: 1;
  }

  .quick-actions {
    display: flex;
    gap: 6px;

    button {
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(157, 78, 221, 0.25);
      border: 1px solid rgba(157, 78, 221, 0.4);
      color: white;
      cursor: pointer;
      font-size: 12px;
      transition: 0.2s ease;

      &:hover {
        background: rgba(157, 78, 221, 0.5);
      }
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;

    .quick-actions {
      justify-content: flex-end;
    }
  }
`;

export const SendButton = styled.button`
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: var(--primary);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: rgba(157, 78, 221, 0.8);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
