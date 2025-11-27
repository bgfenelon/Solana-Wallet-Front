import styled from "styled-components";

/* Swap button - retangular */
export const SwapButton = styled.button`
  width: 100%;
  padding: 14px 16px;
  margin-top: 16px;
  border-radius: 10px; /* retangular com cantos arredondados discretos */
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(90deg, rgba(47,111,255,0.12), rgba(0,216,255,0.06));
  color: #ffffff;
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
  box-shadow: 0 6px 18px rgba(47,111,255,0.06);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(47,111,255,0.12);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
