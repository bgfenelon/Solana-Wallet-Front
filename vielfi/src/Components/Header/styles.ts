import styled from "styled-components";
import { fontSizes, sizes } from "../../styles";

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

>div{
    height: 100%;
    width: 100%;
    max-width: ${sizes.maxWidth};
    padding: 0 5% 0 5%;
    margin: auto;
}
nav{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
`

export const Logo = styled.a`
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    font-size: ${fontSizes.large};
    
    span{
        color: #FFFFFF;
        font-size: 1.25rem;
        font-weight: bold;
        font-height: 1.75rem;
        
    }
    `

    export const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
a{
  text-decoration: none;
opacity: 0.7;
padding: 8px;

&:hover{
  opacity: 1;
}
}
`;