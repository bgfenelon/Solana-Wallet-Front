import styled from "styled-components";

export const Container = styled.div`
  width:100%;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background: linear-gradient(180deg,#050505,#0b0b12);
  padding:40px 0;
`;

export const Card = styled.div`
  width:420px;
  background: rgba(18,18,22,0.9);
  padding:20px;
  border-radius:12px;
  box-shadow: 0 6px 30px rgba(0,0,0,0.6);
`;

export const Title = styled.h2` color:#fff; text-align:center; margin-bottom:16px; `;
export const Section = styled.div` margin-bottom:14px; `;
export const Label = styled.p` color:#aab; margin-bottom:8px; `;

export const Input = styled.input`
  width:100%;
  padding:10px 12px;
  border-radius:8px;
  border:1px solid rgba(255,255,255,0.04);
  background:#0f0f12;
  color:#fff;
`;

export const Button = styled.button`
  width:100%;
  padding:12px;
  margin-top:8px;
  border-radius:8px;
  border:none;
  background:#2f6fff;
  color:#fff;
  font-weight:700;
  cursor:pointer;
  &:disabled{ opacity:0.5; cursor:not-allowed; }
`;

export const TokenButton = styled.button<{active?:boolean}>`
  padding:8px 12px;
  border-radius:8px;
  border: 1px solid rgba(255,255,255,0.06);
  background: ${({active}) => (active ? "#1f6fff" : "transparent")};
  color:#fff;
  cursor:pointer;
`;

export const QuoteBox = styled.div`
  margin-top:12px;
  padding:10px;
  background: rgba(255,255,255,0.02);
  border-radius:8px;
  color:#eaf6ff;
`;

export const Message = styled.p` margin-top:12px; color:#ffd2d2; `;
