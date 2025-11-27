import { useState } from "react";
import { ModalCreate } from "../ModalCreate";
import  ModalImport  from "../ModalImport";
import { PrimaryButton } from "../../styles";
import * as S from "./styles";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  return (
    <>
      {/* Modais */}
      <ModalCreate open={openCreate} onClose={() => setOpenCreate(false)} />
      <ModalImport open={openImport} onClose={() => setOpenImport(false)} />

      <S.MainHeroContent>
        <S.BackgroundGrid>
          <div />
        </S.BackgroundGrid>

        <S.HeroInner>
          <S.Badge>
            <CheckCircle2 size={18} className="glow-icon" />
            <span>Zero-Knowledge Privacy Protocol</span>
          </S.Badge>

          <S.MainHeading>
            <span className="white">Private currency</span>
            <br />
            <span className="primary">for everyone</span>
          </S.MainHeading>

          <S.Subheading>
            The first fully private digital wallet. Send, receive, and hold crypto
            with complete anonymity. Your balance stays hidden. Your transactions
            stay private.
          </S.Subheading>

          <S.Buttons>
            <PrimaryButton onClick={() => setOpenCreate(true)}>
              Create Wallet →
            </PrimaryButton>

            <S.SecondaryButton onClick={() => setOpenImport(true)}>
              Import Wallet
            </S.SecondaryButton>
          </S.Buttons>

          <S.Features>
            <div>
              <CheckCircle2 size={20} className="glow-icon" />
              <span>No KYC Required</span>
            </div>
            <div>
              <CheckCircle2 size={20} className="glow-icon" />
              <span>Non-Custodial</span>
            </div>
            <div>
              <CheckCircle2 size={20} className="glow-icon" />
              <span>Lightning Fast</span>
            </div>
          </S.Features>
        </S.HeroInner>
      </S.MainHeroContent>
    </>
  );
}
