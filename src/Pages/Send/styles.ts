import styled from "styled-components";

export const NavBar = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 12px;
  margin-bottom: 20px;

  button {
    display: flex;
    align-items: center;
    justify-content: left ;
    background: none;
    border: none;
    color: var(--muted-foreground);
    cursor: pointer;
    font-size: 16px;
    padding: 8px;
    flex: 1;

    &:hover {
      color: var(--foreground);
    }
  }

  h2 {
    flex: 1;
    font-size: 1.2rem;
    color: var(--foreground);
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  flex-direction: column;
  display: grid;
  grid-template-rows: 100px 1fr;
  justify-content: center;
  align-items: center;
  background: var(--background);
  padding: 24px;
`;

export const Box = styled.div`
  background: rgba(13, 5, 22, 0.6);
  border: 1px solid rgba(157, 78, 221, 0.3);
  padding: 28px;
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  text-align: center;

  h1 {
    margin-bottom: 22px;
  }
  select{
    background-color: rgba(13, 5, 22, 0.6);
  }

  input {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    margin-bottom: 14px;
    border: 1px solid rgba(157, 78, 221, 0.35);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    outline: none;
  }

  button {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;

    background: rgba(157, 78, 221, 0.25);
    color: #ecd8ff;
    border: 1px solid rgba(157, 78, 221, 0.5);
    transition: 0.15s ease;

    &:hover {
      background: rgba(157, 78, 221, 0.4);
      transform: scale(0.97);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
`;
