import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Wallet } from "../Pages/Wallet/index";
import { Deposit } from "../Pages/Deposit";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/deposit" element={<Deposit />} />


        {/* Aqui você adiciona outras páginas futuramente */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
