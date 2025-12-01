import { Routes, Route } from "react-router-dom";

import { Home } from "../Pages/Home";
import Wallet from "../Pages/Wallet";
import Deposit from "../Pages/Deposit";
import Activity from "../Pages/Activity";
import WalletWithdraw from "../Pages/WalletWithdraw";
import { SendPage } from "../Pages/Send";
import PaymentHistory from "../Pages/PaymentHistory";
import Docs from "../Pages/Docs";
import SwapUSDC from "../Pages/Swap";



export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/wallet" element={<Wallet />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<WalletWithdraw />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="/swap" element={<SwapUSDC />} />
      <Route path="/paymentHistory" element={<PaymentHistory />} />
      <Route path="/docs" element={<Docs />} />



    </Routes>
  );
}
