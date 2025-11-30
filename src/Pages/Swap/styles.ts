import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #0d0d0d;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  background: #111;
  padding: 40px;
  border-radius: 14px;
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;

  input {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #333;
    background: #000;
    color: white;
  }

  button {
    padding: 12px;
    background: #7b3fe4;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
    }
  }
`;

export const Container = styled(PageContainer)`
  padding-top: 60px;
`;
