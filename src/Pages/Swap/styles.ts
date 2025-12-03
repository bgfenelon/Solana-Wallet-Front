import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #020202;
  padding: 20px;
`;

export const Box = styled.div`
max-width: 600px;
margin: auto;
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(157, 78, 221, 0.35);
  display: flex;
  flex-direction: column;
  gap: 20px;

  h2 {
    text-align: center;
    font-size: 20px;
  }

  input,
  select {
    padding: 14px;
    border-radius: 10px;
    border: none;
    outline: none;
    width: 100%;
    background: rgba(255, 255, 255, 0.08);
    color: white;
    font-size: 14px;
  }

  select option {
    background-color: #111;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    opacity: 0.85;
  }
`;

export const AddressBox = styled.div`
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 13px;
  word-break: break-all;
`;

export const QuoteBox = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(131, 0, 0, 0.1);
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;

  .impact {
    margin-top: 6px;
    font-size: 12px;
    opacity: 0.8;
  }
`;

export const ErrorBox = styled.div`
  background: rgba(255, 0, 0, 0.3);
  border: 1px solid rgba(255, 0, 0, 0.3);
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
`;

export const SucessBox = styled.div`
  background: rgba(60, 255, 0, 0.3);
  border: 1px solid rgba(26, 255, 0, 0.3);
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
`;

export const SwapButton = styled.button`
  background: var(--primary);
  padding: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;   /* ✅ MESMA LARGURA DO BOX */
  margin: 10px auto 0 auto;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px;
  font-size: 14px;
  border-radius: 20px;
  border: 1px solid #16161680;

  &:hover {
    border-color: rgba(157, 78, 221, 0.3);
  }

  h6 {
    font-size: 12px;
  }

  p {
    font-weight: 100;
    font-size: 10px;
    letter-spacing: 0.5px;
  }

  .fontDiv {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;



export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30%;
`;