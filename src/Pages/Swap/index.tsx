import { useState, useEffect } from "react";
import { createOrder, confirmOrder, getJSON } from "../../services/api";
import {
  Container,
  Title,
  Label,
  Input,
  Button,
  Box,
  CodeBox
} from "./styles";

const PRICE_PER_TOKEN_SOL = 0.000004; // 1 VEIL custa 0.000004 SOL

export default function Swap() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);

  const [veilAmount, setVeilAmount] = useState("");        // Quantos VEIL o usuário quer comprar
  const [solToPay, setSolToPay] = useState<number>(0);     // Calculado automaticamente

  const [order, setOrder] = useState<any>(null);
  const [paymentSig, setPaymentSig] = useState("");
  const [result, setResult] = useState<any>(null);

  // Carrega saldo da carteira do usuário
  async function loadWallet() {
    try {
      const data = await getJSON("/session/me");

      if (data?.ok && data.user?.walletPubkey) {
        setWalletAddress(data.user.walletPubkey);
        setWalletBalance(data.user.balanceSol ?? 0);
      }
    } catch (e) {
      console.log("Erro ao carregar", e);
    }
  }

  useEffect(() => {
    loadWallet();
  }, []);

  // Quando o usuário altera a quantidade de VEIL -> recalcula SOL
  useEffect(() => {
    if (!veilAmount) {
      setSolToPay(0);
      return;
    }

    const amount = Number(veilAmount);
    if (amount > 0) {
      setSolToPay(amount * PRICE_PER_TOKEN_SOL);
    }
  }, [veilAmount]);

  // Criar pedido de compra
  const handleCreateOrder = async () => {
    if (!veilAmount) {
      alert("Digite a quantidade de VEIL que deseja comprar.");
      return;
    }

    if (!walletAddress) {
      alert("Você precisa estar logado.");
      return;
    }

    // Em vez de USD, enviamos SOL direto
    const usdFake = 1; // NÃO USADO (apenas porque a rota exige usdAmount)

    const data = await createOrder(Number(usdFake), walletAddress);

    // Mas sobrescrevemos o real valor em SOL usando o cálculo
    data.solToPay = solToPay;
    data.tokensSmallest = Number(veilAmount) * 1e9;

    setOrder(data);
  };

  // Confirmar compra
  const handleConfirm = async () => {
    if (!paymentSig) {
      alert("Cole a assinatura da transação.");
      return;
    }

    const data = await confirmOrder(order.orderId, paymentSig);
    setResult(data);
  };

  return (
    <Container>
      <Title>Comprar VEIL</Title>

      {/* Mostrar saldo da carteira */}
      <Box>
        <p><strong>Carteira:</strong></p>
        <CodeBox>{walletAddress ?? "Carregando..."}</CodeBox>

        <p style={{ marginTop: "10px" }}>
          <strong>Saldo:</strong> {walletBalance ?? "0"} SOL
        </p>
      </Box>

      {/* PASSO 1 — Usuário escolhe quanto quer comprar */}
      {!order && (
        <>
          <Label>Quantidade de VEIL para comprar</Label>
          <Input
            type="number"
            value={veilAmount}
            onChange={(e) => setVeilAmount(e.target.value)}
            placeholder="Ex: 10000"
          />

          <Label>Você pagará (SOL)</Label>
          <Input
            type="number"
            value={solToPay}
            disabled
            style={{ opacity: 0.7 }}
          />

          <Button onClick={handleCreateOrder}>Criar pedido</Button>
        </>
      )}

      {/* PASSO 2 — Pagar */}
      {order && !result && (
        <Box>
          <h2>Enviar pagamento</h2>

          <p>
            Envie <strong>{solToPay}</strong> SOL para:
          </p>

          <CodeBox>{order.walletToPay}</CodeBox>

          <p>Você receberá: <strong>{veilAmount} VEIL</strong></p>

          <Label>Assinatura da transação</Label>
          <Input
            type="text"
            value={paymentSig}
            onChange={(e) => setPaymentSig(e.target.value)}
            placeholder="Cole aqui a tx signature"
          />

          <Button onClick={handleConfirm}>Confirmar compra</Button>
        </Box>
      )}

      {/* PASSO 3 — Resultado */}
      {result && (
        <Box>
          {result.success ? (
            <>
              <h2>Compra concluída! 🎉</h2>
              <p>Tokens enviados: {Number(veilAmount)} VEIL</p>

              <Label>Signature da transferência</Label>
              <CodeBox>{result.contractSignature}</CodeBox>
            </>
          ) : (
            <>
              <h2 style={{ color: "red" }}>Erro ao confirmar</h2>
              <p>{result.message}</p>
            </>
          )}
        </Box>
      )}
    </Container>
  );
}
