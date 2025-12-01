import styled from "styled-components";



export const Container = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
`;

export const Box = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 35px;
  border-radius: 18px;
  width: 100%;
  max-width: 420px;
  border: 1px solid rgba(157, 78, 221, 0.35);
  display: flex;
  flex-direction: column;
  gap: 20px;

  input, select {
    padding: 14px;
    border-radius: 10px;
    border: none;
    outline: none;
    width: 10=0%;
    background: rgba(255,255,255,0.08) ;
    color: purple;
  }

  select option {
  background-color: #111 !important; /* fundo das opções */
  color: purple !important;
}


  
  button {
    background: #9d4edd;
    padding: 14px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 18px;
  }

  h1 {
    font-size: 22px;
    text-align: center;
  }
`;

export const Option = styled.option`
    padding: 14px;
    border-radius: 10px;
    border: none;
    outline: none;
    width: 100%;
    background: rgba(255,255,255,0.08) ;
    color: black;
`

export const ToggleButton = styled.button`
  padding: 10px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(157, 78, 221, 0.35);
  border-radius: 10px;
  cursor: pointer;
  color: white;

  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

export const FeeNote = styled.div`
  font-size: 12px;
  opacity: 0.6;
  text-align: center;
`;

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