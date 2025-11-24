import { useEffect, useState } from "react";
import { useWalletStore } from "../../store/walletStore";
import * as S from "./styles";
import QRCode from "react-qr-code";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

export function Deposit() {
  const navigate = useNavigate();

  const depositAddress = useWalletStore((s) => s.depositAddress);
  const setDepositAddress = useWalletStore((s) => s.setDepositAddress);
  const setBalance = useWalletStore((s) => s.setBalance);

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Waiting for deposit...");

  // Criar endereço único ao entrar
  useEffect(() => {
    if (!depositAddress) {
      const addr = "0x" + nanoid(32);
      setDepositAddress(addr);
    }
  }, []);

  // Simulação do fluxo de depósito
  useEffect(() => {
    if (!depositAddress) return;

    const steps = [
      { time: 2000, text: "Transaction detected…" },
      { time: 4000, text: "1 confirmation…" },
      { time: 6000, text: "2 confirmations…" },
      { time: 8000, text: "Deposit complete ✔" },
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setStatus(step.text);
        setProgress(((index + 1) / steps.length) * 100);

        if (index === steps.length - 1) {
          // aumentar saldo privado
          setBalance(0.5); // valor simulado
          navigate("/wallet");
        }
      }, step.time);
    });
  }, [depositAddress]);

  return (
    <S.Container>
      <h1>Deposit</h1>

      <p>Send ETH to your private deposit address:</p>

      <S.AddressBox>{depositAddress}</S.AddressBox>

      <QRCode
        value={depositAddress || ""}
        style={{ width: "200px", height: "200px", margin: "20px auto" }}
      />

      <S.Progress>
        <div style={{ width: `${progress}%` }} />
      </S.Progress>

      <p>{status}</p>
    </S.Container>
  );
}
