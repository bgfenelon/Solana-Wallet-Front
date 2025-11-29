import { useState } from "react";
import * as S from "./styles";
import { withdrawSol } from "../../services/withdrawSol";
import { PrimaryButton } from "../../styles";

export function WalletWithdraw() {
  // agora tipado via src/env.d.ts
  const userId = import.meta.env?.VITE_USER_ID ?? "";

  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const [destinationError, setDestinationError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const validate = () => {
    let ok = true;

    if (destination.trim().length < 32) {
      setDestinationError(true);
      ok = false;
    } else setDestinationError(false);

    if (!amount || Number(amount) <= 0) {
      setAmountError(true);
      ok = false;
    } else setAmountError(false);

    return ok;
  };

  const handleWithdraw = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await withdrawSol(
        userId,
        destination,
        parseFloat(amount)
      );

      alert("Saque enviado!\nTx: " + res.signature);
    } catch (err: any) {
      console.error(err);
      alert("Erro ao sacar: " + err?.message);
    }
    setLoading(false);
  };

  return (
    <S.Container>
      <S.Card>
        <h1>Withdraw SOL</h1>
        <p>Envie SOL para qualquer endereço.</p>

        <S.Field>
          <S.Label>Endereço de destino</S.Label>
          <S.Input
            placeholder="Ex: Gs9kj12D..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            $error={destinationError}
          />
        </S.Field>

        <S.Field>
          <S.Label>Valor (SOL)</S.Label>
          <S.Input
            type="number"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            $error={amountError}
          />
        </S.Field>

        <PrimaryButton onClick={handleWithdraw} disabled={loading}>
          {loading ? "Enviando..." : "Confirmar Saque →"}
        </PrimaryButton>
      </S.Card>
    </S.Container>
  );
}

export default WalletWithdraw;
