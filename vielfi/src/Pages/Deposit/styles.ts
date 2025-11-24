import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 120px auto;
  text-align: center;
  padding: 20px;

  h1 {
    color: var(--foreground);
    margin-bottom: 12px;
  }

  p {
    color: var(--muted-foreground);
    margin-bottom: 18px;
  }
`;

export const AddressBox = styled.div`
  background: #111;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid color-mix(in oklab, var(--primary) 25%, transparent);
  color: var(--foreground);
  font-size: 0.9rem;
  word-break: break-all;
  margin-bottom: 20px;
`;

export const Progress = styled.div`
  width: 100%;
  height: 10px;
  background: #222;
  border-radius: 8px;
  margin: 30px 0;

  div {
    height: 100%;
    background: var(--primary);
    border-radius: 8px;
    transition: width 0.3s;
  }
`;
