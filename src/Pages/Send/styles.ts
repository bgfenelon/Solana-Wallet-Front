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
    justify-content: left;
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

  /* MOBILE */
  @media (max-width: 420px) {
    gap: 8px;

    button {
      font-size: 14px;
      padding: 6px;
    }

    h2 {
      font-size: 1rem;
    }
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

  /* MOBILE */
  @media (max-width: 500px) {
    padding: 16px;
    grid-template-rows: 80px 1fr;
  }

  @media (max-width: 380px) {
    padding: 12px;
  }
`;

export const From = styled.div`
  width: 100%;
  word-wrap: break-word;
  border: 1px solid;
  padding: 10px 20px;
  border-radius: 10px;

  @media (max-width: 420px) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;

export const Box = styled.div`
  min-width: 500px;
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

  h2 {
    margin-bottom: 20px;
  }

  select {
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

  /* TABLET */
  @media (max-width: 550px) {
    min-width: 100%;
    padding: 24px;
  }

  /* MOBILE */
  @media (max-width: 420px) {
    padding: 20px;
    border-radius: 16px;

    h1 {
      font-size: 1.3rem;
      margin-bottom: 16px;
    }

    h2 {
      font-size: 1.1rem;
      margin-bottom: 14px;
    }

    input {
      padding: 12px;
      font-size: 14px;
    }

    button {
      padding: 12px;
      font-size: 0.95rem;
    }
  }

  /* EXTRA SMALL DEVICES */
  @media (max-width: 350px) {
    padding: 16px;

    h1 {
      font-size: 1.15rem;
    }

    input {
      font-size: 13px;
    }
  }
`;

export const Field = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;

  label {
    color: #ccc;
    font-size: 14px;
    margin-bottom: 6px;
  }

  input,
  select {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #333;
    background: #1d1d1d;
    color: #fff;
    font-size: 15px;
    outline: none;
    transition: 0.2s;

    &:focus {
      border-color: #4b7bec;
      background: #222;
    }
  }

  /* MOBILE */
  @media (max-width: 420px) {
    label {
      font-size: 13px;
    }

    input,
    select {
      padding: 10px;
      font-size: 14px;
    }
  }
`;
