import * as S from "./styles";
import { PrimaryButton } from "../../styles";
import { Shield, Eye, Lock, Zap, Key, CheckCircle2 } from "lucide-react";

export function PrivacyFeatures() {
  const steps = [
    {
      icon: Shield,
      title: "Shielded Balances",
      description:
        "Your wallet balance is encrypted using zero-knowledge proofs."
    },
    {
      icon: Eye,
      title: "Anonymous Transactions",
      description:
        "Send and receive without revealing sender, receiver, or amount."
    },
    {
      icon: Lock,
      title: "Non-Custodial Security",
      description:
        "You control your keys — your assets never leave your possession."
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
    <S.Section>
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
          <PrimaryButton>Get Started Now →</PrimaryButton>
        </S.CTA>
      </S.Container>
    </S.Section>
  );
}
