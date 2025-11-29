import { useState } from "react";
import { animate } from "framer-motion";
import { PrimaryButton } from '../../styles';
import * as S from './styles';
import { Button } from "../PrivacyFeatures/styles";
import ModalCreate from "../ModalCreate";

export function Header() {
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

  const smoothScroll = (target: string) => {
    const element = document.querySelector(target);
    if (!element) return;

    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - 80;

    animate(window.scrollY, targetPosition, {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0],
      onUpdate: (v) => window.scrollTo(0, v),
    });

    setOpen(false); // fecha menu mobile após navegar
  };

  return (
    <S.MainContainer>
            <ModalCreate open={openCreate} onClose={() => setOpenCreate(false)} />
      <S.Header>
        <div>
          <nav>
            <S.Logo href="/" className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ZVjMTys6STYDB0t4fhhg5UozJDxBAq.png"
                alt="Veilfi"
                width={40}
                height={40}
                className="object-contain"
              />
              <span>Veilfi</span>
            </S.Logo>

            {/* LINKS DESKTOP */}
            <S.Links>
              <button onClick={() => smoothScroll("#features")}>Features</button>
              <button onClick={() => smoothScroll("#security")}>Security</button>
              <button onClick={() => smoothScroll("#docs")}>Docs</button>
            </S.Links>

            <PrimaryButton className="mobile-none" onClick={() => setOpenCreate(!openCreate)}>
              launch App →
            </PrimaryButton>

            {/* BOTÃO MOBILE */}
            <S.MenuButton onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
              <span className={open ? "line open" : "line"} />
              <span className={open ? "line open" : "line"} />
              <span className={open ? "line open" : "line"} />
            </S.MenuButton>
          </nav>
        </div>
      </S.Header>

      {/* MENU MOBILE */}
      <S.MobileMenu open={open} role="dialog" aria-modal={open}>
        <S.MobileInner>
          {/* Botão de fechar claro e acessível no canto superior direito */}
          <S.CloseButton onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </S.CloseButton>

          <div className="links">
            <button onClick={() => smoothScroll("#privacy")}>Verifi</button>
            <button onClick={() => smoothScroll("#privacy")}>Features</button>
            <a href="https://v0-penta-docs-clone.vercel.app/" onClick={() => smoothScroll("#docs")}>Docs</a>
           
            <PrimaryButton onClick={() => setOpenCreate(!openCreate)}>
              Get Started Now →
            </PrimaryButton>
          
          </div>
        </S.MobileInner>
      </S.MobileMenu>
    </S.MainContainer>
  )}