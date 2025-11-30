import { Routes, Route } from "react-router-dom";

import { Home } from "../Pages/Home";
import Wallet from "../Pages/Wallet";
import Deposit from "../Pages/Deposit";
import Activity from "../Pages/Activity";
import WalletWithdraw from "../Pages/WalletWithdraw";
import PaymentHistory from "../Pages/PaymentHistory";
import Docs from "../Pages/Docs";



export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/wallet" element={<Wallet />} />
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/withdraw" element={<WalletWithdraw />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/paymentHistory" element={<PaymentHistory />} />
      <Route path="/docs" element={<Docs />} />



    </Routes>
  );
}
