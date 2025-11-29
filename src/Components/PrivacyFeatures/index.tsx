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
      title: "Lightning Speed",
      description:
        "Near instant transactions with low fees. Privacy without compromise."
    },
    {
      icon: Key,
      title: "No KYC Required",
      description:
        "Start using Veilfi immediately. No identity verification needed."
    },
    {
      icon: CheckCircle2,
      title: "Audited & Secure",
      description:
        "Independently audited smart contracts and cryptographic implementations."
    }
  ];

  return (
    <S.Section id="privacy">
      
              <ModalCreate open={openCreate} onClose={() => setOpenCreate(false)} />
              <ModalImport open={openImport} onClose={() => setOpenImport(false)} />
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
          <h3>Ready for true privacy?</h3>
          <p>Join thousands protecting their financial privacy with Veilfi.</p>
            <PrimaryButton onClick={() => setOpenCreate(true)}>
              Get Started Now →
            </PrimaryButton>
          
        </S.CTA>
      </S.Container>
    </S.Section>
  );
}
