import * as S from "./styles";

export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Deposit",
      description:
        "Send crypto to your single-use address. Your deposit automatically transfers to the private pool.",
      gradient:
        "linear-gradient(135deg, color-mix(in oklab, var(--primary) 20%, transparent), transparent)"
    },
    {
      number: "2",
      title: "Shield",
      description:
        "Your balance becomes private using zero-knowledge proofs.",
      gradient:
        "linear-gradient(135deg, #9d4edd33, transparent)"
    },
    {
      number: "3",
      title: "Transact",
      description:
        "Send and receive with complete anonymity.",
      gradient:
        "linear-gradient(135deg, #9d4edd55, transparent)"
    }
  ];

  return (
    <S.Section id="features">
      <S.Container>
        <S.Header>
          <h2>How Veilfi Works</h2>
          <p>Three simple steps to complete financial privacy</p>
        </S.Header>

        <S.StepsGrid>
          {steps.map((step) => (
            <S.StepCard key={step.number}>
              <S.NumberBadge>
                <span>{step.number}</span>
              </S.NumberBadge>

              <S.StepTitle>{step.title}</S.StepTitle>
              <S.StepDescription>{step.description}</S.StepDescription>

              <S.Overlay gradient={step.gradient} />
            </S.StepCard>
          ))}
        </S.StepsGrid>
      </S.Container>
    </S.Section>
  );
}
