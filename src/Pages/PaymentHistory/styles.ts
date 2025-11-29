import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 22px;
  background: var(--background);
  color: var(--foreground);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* NAVBAR RESPONSIVA E ALINHADA */
export const NavBar = styled.div`
  width: 100%;
  max-width: 520px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  margin-bottom: 22px;

  button {
    position: absolute;
    left: 0;
    background: none;
    color: var(--muted-foreground);
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      color: var(--foreground);
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
  }
`;

/* SEARCH + FILTER */
export const SearchRow = styled.div`
  width: 100%;
  max-width: 520px;

  margin-top: 10px;
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

/* INPUT */
export const SearchInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(157, 78, 221, 0.3);
  border-radius: 12px;
  padding: 14px;
  color: white;
  outline: none;
  font-size: 0.95rem;

  &:focus {
    border-color: rgba(157, 78, 221, 0.8);
  }
`;

/* FILTER SELECT */
export const FilterSelect = styled.select`
  min-width: 150px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(157, 78, 221, 0.4);
  border-radius: 12px;
  padding: 14px;
  color: #e7d3ff;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
  transition: 0.2s ease;

  backdrop-filter: blur(6px);

  &:hover {
    border-color: rgba(157, 78, 221, 0.7);
    background: rgba(157, 78, 221, 0.15);
  }

  &:focus {
    border-color: rgba(157, 78, 221, 0.9);
    box-shadow: 0 0 12px rgba(157, 78, 221, 0.4);
  }

  option {
    background: #0d0516;
    color: #f4e8ff;
  }

  /* remove seta nativa e coloca a personalizada */
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='%23dcb9ff' height='22' viewBox='0 0 24 24' width='22' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-position: right 14px center;
  background-repeat: no-repeat;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

/* LISTA */
export const ListContainer = styled.div`
  width: 100%;
  max-width: 520px;
  margin-top: 22px;
`;

/* EMPTY */
export const Empty = styled.div`
  margin-top: 60px;
  text-align: center;
  color: var(--muted-foreground);
`;

/* CARD */
export const TransactionCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(157, 78, 221, 0.25);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 12px;
  backdrop-filter: blur(4px);

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;

    &.small {
      font-size: 0.85rem;
      opacity: 0.7;
    }
  }

  .type {
    font-weight: 600;

    &.received {
      color: #4ade80;
    }

    &.sent {
      color: #f87171;
    }
  }

  .amount {
    font-weight: 700;
  }

  .signature {
    margin-top: 6px;
    font-size: 0.75rem;
    opacity: 0.5;
    word-break: break-all;
  }
`;
