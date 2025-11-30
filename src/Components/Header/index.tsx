import { useState } from "react";
import { animate } from "framer-motion";
import { PrimaryButton } from "../../styles";
import * as S from "./styles";
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
      {/* MODAL DE CRIAÇÃO */}
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
              <button onClick={() => smoothScroll("#privacyTech")}>Security</button>
              <S.LinkStyled to="/docs">Docs</S.LinkStyled>
            </S.Links>

            {/* BOTÃO DESKTOP */}
            <PrimaryButton
              className="mobile-none"
              onClick={() => setOpenCreate(true)}
            >
              launch App →
            </PrimaryButton>

            {/* BOTÃO HAMBURGUER (MOBILE) */}
            <S.MenuButton
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
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
          {/* Botão para fechar menu */}
          <S.CloseButton onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </S.CloseButton>

          <div className="links">
            <button onClick={() => smoothScroll("#privacy")}>Verifi</button>
            <button onClick={() => smoothScroll("#features")}>Features</button>
            <S.LinkStyled to="/docs">Docs</S.LinkStyled>

            <PrimaryButton onClick={() => setOpenCreate(true)}>
              Get Started Now →
            </PrimaryButton>
          </div>
        </S.MobileInner>
      </S.MobileMenu>
    </S.MainContainer>
  );
}
export default Header