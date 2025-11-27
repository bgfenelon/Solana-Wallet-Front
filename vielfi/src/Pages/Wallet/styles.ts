// src/Pages/Wallet/styles.ts
import styled from "styled-components";
import { Link } from "react-router-dom";

export const PageContainer = styled.div`
  min-height: 100vh;
  padding: 32px;
  background: var(--background);
  color: var(--foreground);
`;

export const Content = styled.div`
  max-width: 920px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;
  .brand { display:flex; gap:12px; align-items:center; img{width:36px} h1{font-size:20px} }
`;

export const BalanceCard = styled.div`
  background: rgba(13,5,22,0.6);
  border: 1px solid rgba(157,78,221,0.3);
  padding: 22px;
  border-radius: 20px;
  margin-bottom: 28px;
`;

export const BalanceHeader = styled.div`
  display:flex; justify-content:space-between; margin-bottom:18px;
  .left { display:flex; gap:12px; align-items:center;
    .iconBox { background: rgba(157,78,221,0.22); padding:8px; border-radius:10px; }
    .shield{ color: #9d4edd; }
    .title{ font-size:14px; color:#b7b3c7 }
    .subtitle{ font-size:12px; color:#948fa1 }
  }
  .right button { background:transparent; border:none; cursor:pointer; .eye{ color:#c0b9cc } }
`;

export const BalanceValue = styled.div`
  font-size: 38px;
  font-weight: 700;
  .currency { font-size: 20px; margin-left: 8px; color: #9d4edd; }
`;

export const BalanceFiat = styled.div`
  margin-top: 4px; font-size:15px; color:#b9b2c4;
`;

/* ACTION GRID */
export const ActionGrid = styled.div`
  display:grid; grid-template-columns: repeat(3, 1fr); gap:18px; margin-bottom:28px;
`;

export const ActionButton = styled(Link)`
  background: rgba(13,5,22,0.6);
  border: 1px solid rgba(157,78,221,0.3);
  padding: 20px;
  border-radius: 20px;
  display:flex; flex-direction:column; align-items:center; gap:12px; text-decoration:none; color:inherit;
  &:hover { background: rgba(157,78,221,0.12); transform: scale(0.97); }
  .title { font-size:14px; font-weight:600; }
  .subtitle { font-size:12px; color:#b7b3c7; }
`;

export const ActionIcon = styled.div`
  background: rgba(157,78,221,0.22);
  padding:12px;
  border-radius:14px;
  &.green { background: rgba(52,211,153,0.18); color:#34d399; }
  &.purple { background: rgba(157,78,221,0.22); color:#9d4edd; }
`;

/* ACTIVITY */
export const ActivityCard = styled.div`
  background: rgba(13,5,22,0.6);
  border: 1px solid rgba(157,78,221,0.3);
  padding: 22px;
  border-radius: 20px;
`;

export const ActivityHeader = styled.div`
  display:flex; justify-content:space-between; margin-bottom:20px;
  h2{ font-size:18px; }
  button{ background:transparent; border:none; color:#9d4edd; cursor:pointer; }
`;

export const ActivityItem = styled.div`
  display:flex; justify-content:space-between; padding:14px 0; border-top:1px solid rgba(255,255,255,0.08);
`;

export const ActivityLeft = styled.div`
  display:flex; gap:12px; .title{ font-weight:600 } .date{ font-size:12px; color:#a89db8 }
`;

export const ActivityIconBox = styled.div`
  background: rgba(157,78,221,0.24); width:40px; height:40px; border-radius:12px;
`;

export const ActivityRight = styled.div`
  text-align:right; .amount{ color:#9d4edd; font-weight:600 } .status{ font-size:12px; color:#a89db8 }
`;
