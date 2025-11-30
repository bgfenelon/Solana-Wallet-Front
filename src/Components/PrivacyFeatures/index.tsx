import { useState } from "react";
import { PrimaryButton } from "../../styles";
import ModalCreate from "../ModalCreate";
import ModalImport from "../ModalImport";
import * as S from "./styles";
import { Shield, Eye, Lock, Zap, Key, CheckCircle2 } from "lucide-react";

export function PrivacyFeatures() {
  const [open, setOpen] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  const steps = [
    {
      icon: Shield,
      title: "Shielded Balances",
      description:
        "Your wallet balance is encrypted using zero-knowledge proofs. Only you know how much you hold."
    },
    {
      icon: Eye,
      title: "Anonymous Transactions",
      description:
        "Send and receive without revealing sender, receiver, or amount. Complete transaction privacy."
    },
    {
      icon: Lock,
      title: "Non-Custodial Security",
      description:
        "You control your keys, you control your funds. Your assets never leave your possession."
    },
    {
      icon: Zap,
      title: "Instant Tranfers",
      description:
        "Built on Solana for lightning-fast transactions. Privacy without compromising on speed."
    },
    {
      icon: Key,
      title: "No KYC Required",
      description:
        "Create and use your wallet instantly without providing any personal information or documents."
    },
    {
      icon: CheckCircle2,
      title: "Merkle Tree Privacy",
      description:
        "Advanced commitment schemes ensure mathematical privacy guarantees for every transaction."
    }
  ];

  return (
    <S.Section id="privacy">


      <S.Container>
        <S.Header>
          <h2>Built for Privacy</h2>
          <p>
            Advanced cryptographic techniques ensure your financial activity
            remains completely confidential.
          </p>
        </S.Header>

        <S.FeaturesGrid>
          {steps.map(({ icon: Icon, title, description }) => (
            <S.Card key={title}>
              <S.IconWrap>
                <Icon size={26} color="var(--primary)" />
              </S.IconWrap>

              <S.Title>{title}</S.Title>
              <S.Description>{description}</S.Description>
            </S.Card>
          ))}
        </S.FeaturesGrid>

        <S.CTA>
          <h3>Start Using Veilfi Today</h3>
          <p>Join the future of private finance on Solana. Create your wallet in seconds and experience true financial privacy.</p>

          <S.BtnContainer>
            <PrimaryButton onClick={() => setOpenCreate(false)}>
              Create Wallet Now 
            </PrimaryButton>
            <S.LinkStyle to="/docs">
              Learn More
            </S.LinkStyle>
          </S.BtnContainer>


        </S.CTA>
      </S.Container>
    </S.Section>
  );
}
