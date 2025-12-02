import { useState } from "react";
import ModalCreate from "../ModalCreate";
import ModalImport from "../ModalImport";
import { PrimaryButton } from "../../styles";
import * as S from "./styles";
import { CheckCircle2, Copy } from "lucide-react";
import axion from "../../axion.jpg"
import pumpf from "../../pumpFun.jpg"


export function Hero() {
    const [copied, setCopied] = useState(false);
      const [openCreate, setOpenCreate] = useState(false);
  const [openImport, setOpenImport] = useState(false);


  const copyToClipboard = async () => {
    const text = "VSKXrgwu5mtbdSZS7Au81p1RgLQupWwYXX1L2cWpump";


 try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback caso o navegador bloqueie o clipboard
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }

  }

  return (
    <>
      {/* Renderização condicional dos modais */}
      {openCreate && (
        <ModalCreate open={openCreate} onClose={() => setOpenCreate(false)} />
      )}

      {openImport && (
        <ModalImport open={openImport} onClose={() => setOpenImport(false)} />
      )}

      <S.MainHeroContent>
        <S.BackgroundGrid>
          <div />
        </S.BackgroundGrid>

        <S.HeroInner>



          <S.MainHeading>
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png" alt="" />
              <S.Contract onClick={copyToClipboard}>
            <Copy  size={18} className="glow-icon" />
                        {/* MUDAR AQUI */}

            <h6 onClick={()=>copyToClipboard()}>CA - VSKXrgwu5mtbdSZS7Au81p1RgLQupWwYXX1L2cWpump</h6>
          </S.Contract>
            <h1><span >Private currency </span> <br />
            <span  className="primary">for everyone</span></h1>
            <br />
          </S.MainHeading>

          <S.Subheading>
            The first fully private wallet on Solana. Send, receive,
             and hold SOL with complete anonymity. Your balance stays hidden.
              Your transactions stay private.

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
            {/* <div>
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
            </div> */}
                    

            {/* <S.ContractContainer>
                         MUDAR AQUI AXIOM 
            <S.ContractLink href="https://axiom.trade/meme/DZgvxpQhK1Gx7EgzxbVsgLhZ3JxDgZq1tngJVGhJnM86?chain=sol ">
            <img src={axion} 
            
            />
            
          </S.ContractLink>
                        {/* MUDAR AQUI PUMP FUN 
          <S.ContractLink href="https://pump.fun/coin/VSKXrgwu5mtbdSZS7Au81p1RgLQupWwYXX1L2cWpump">
            <img src={pumpf} />
            
          </S.ContractLink>
            </S.ContractContainer> */}
          </S.Features>
        </S.HeroInner>
      </S.MainHeroContent>
    </>
  );
}
