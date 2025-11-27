import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { getJSON, postJSON } from "../../services/api";
import { Container, Card, QRWrapper, AddressBox, InfoText } from "./styles";
import { Header } from "../../Components/Header";

export default function Deposit() {
  const [pubkey, setPubkey] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

useEffect(() => {
  async function load() {
    try {
      const session = await getJSON("/session/me");

      if (!session.user?.walletPubkey) {
        console.error("No pubkey in session");
        setLoading(false);
        return;
      }

      const res = await postJSON("/user/balance", {
        userPubkey: session.user.walletPubkey,
      });

      setPubkey(session.user.walletPubkey);
      setBalance(res.solBalance);
    } catch (err) {
      console.error("Error loading deposit:", err);
    } finally {
      setLoading(false);
    }
  }
  load();
}, []);


  function copyAddress() {
    navigator.clipboard.writeText(pubkey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <Header />
      <Container>
        <Card>
          <h1>Deposit</h1>
          <p>Send SOL to your personal wallet address:</p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <QRWrapper>
                <QRCode
                  size={180}
                  style={{ height: "180px", width: "180px" }}
                  value={pubkey}
                />
              </QRWrapper>

              <AddressBox>
                <strong>Wallet Address</strong>
                <p>{pubkey}</p>
              </AddressBox>

              <button
                onClick={copyAddress}
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "14px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #b026ff, #7d00ff, #5500c8)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  boxShadow: "0 0 18px rgba(157, 78, 221, 0.35)",
                }}
              >
                {copied ? "Copied!" : "Copy Address"}
              </button>

              <InfoText>
                The system will automatically detect new deposits.
              </InfoText>

              <InfoText style={{ marginTop: "24px", fontSize: "18px" }}>
                <strong>Balance:</strong> {balance ?? 0} SOL
              </InfoText>
            </>
          )}
        </Card>
      </Container>
    </>
  );
}
