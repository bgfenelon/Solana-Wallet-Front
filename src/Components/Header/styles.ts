import styled from "styled-components";

export const MainContainer = styled.div`
  z-index: 10;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid rgba(157, 78, 221, 0.20);
`;

export const Header = styled.header`
  top: 0;
  backdrop-filter: blur(10px);
  width: 100%;
  height: 80px;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.8);

  > div {
    height: 100%;
    width: 100%;
    max-width: 1024px;
    padding: 0 5%;
    margin: auto;
  }

  nav {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 768px) {
    height: 70px;
  }
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  span {
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    img {
      width: 32px;
      height: 32px;
    }

    span {
      font-size: 1.1rem;
    }
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,0.7);
    font-size: 1rem;
    transition: 0.2s;
  }

  button:hover {
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* MENU BUTTON */
export const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;

    .line {
      width: 28px;
      height: 3px;
      background: white;
      border-radius: 3px;
      transition: 0.3s ease;
    }

    .line.open:nth-child(1) {
      transform: rotate(45deg) translateY(8px);
    }
    .line.open:nth-child(2) {
      opacity: 0;
    }
    .line.open:nth-child(3) {
      transform: rotate(-45deg) translateY(-8px);
    }
  }
`;

/* MOBILE MENU */
export const MobileMenu = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 40;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);

  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: opacity 0.24s ease, visibility 0.24s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

/* Inner wrapper to hold content and close button */
export const MobileInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 80px 32px 32px 32px; /* top padding to give space under header */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .links {
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: center;
    width: 100%;
    max-width: 420px;
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    opacity: 0.95;
    transition: 0.2s;
    cursor: pointer;
    text-align: center;
  }

  button:hover {
    opacity: 1;
  }
`;

/* Close button in top-right corner of mobile menu */
export const CloseButton = styled.button`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.05);
  color: white;
  font-size: 28px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, transform 0.12s;

  &:hover {
    background: rgba(255,255,255,0.08);
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.98);
  }
`;
