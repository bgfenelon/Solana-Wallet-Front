import styled, { createGlobalStyle } from "styled-components";

export const colors = {
  primary: "#FF5733",
  secondary: "#33C1FF",
  background: "#000000",
  text: "#FFFFFF",
  backgroundLinearPurple: "linear-gradient(135deg, #000000 0%, #1a0a2e 50%, #000000 100%)",
  gradientCard: "background: linear-gradient(135deg, #141414 0%, #1a0a2e 100%);"
};



export const glow = {
  textGlow:  " 0 0 20px rgba(157, 78, 221, 0.5), 0 0 40px rgba(157, 78, 221, 0.3), 0 0 60px rgba(157, 78, 221, 0.2);",
  glowBoxShadowBorder: "0 0 20px rgba(157, 78, 221, 0.3), inset 0 0 20px rgba(157, 78, 221, 0.1);",
  glowFilter: "filter: drop-shadow(0 0 8px rgba(157, 78, 221, 0.6));"
}

export const fontSizes = {
  small: "0.875rem",
  medium: "1rem",
  large: "1.25rem",
  xlarge: "2rem",
  xxlarge: "5rem",
};

export const fonts = {
  primary: "'Geist', 'Geist-Fallback', sans-serif",
  secondary: "'Montserrat', sans-serif",
};

export const sizes = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  maxWidth: "1200px",
};


export const GlobalStyle = createGlobalStyle`
:root {
  --primary: #9d4edd;
  --primary-foreground: #ffffff;

  --background: #000000;
  --foreground: #ffffff;

  /* caso ainda não tenha */
  --muted-foreground: rgba(255, 255, 255, 0.7);
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${colors.text};
    font-family: ${fonts.primary};
button{
  cursor: pointer;  
}
  } 
  body{
    background-color: ${colors.background};
  }
  html {
  scroll-behavior: smooth;
}
  
`;

export const Container = styled.div`
  margin: 0 auto;
`;  

export const PrimaryButton = styled.button`
  padding: 16px 32px;
  font-size: ${fontSizes.medium};
  color: #ffffff;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);

  background: var(--primary);

  box-shadow: 
    0 0 20px rgba(157, 78, 221, 0.3),
    inset 0 0 20px rgba(157, 78, 221, 0.1);

  &:hover {
    background: color-mix(in oklab, var(--primary) 90%, white);
  }
  &.btn-sm{
   padding: 10px 15px;
   font-size: 90%;
  }
  &.big{
    margin-top: 20px;
    width: 100%;
  }
`;

export const BackButton = styled.button`
position: absolute;
left: 10;
`
