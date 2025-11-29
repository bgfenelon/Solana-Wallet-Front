import styled from "styled-components";
import { sizes, fontSizes } from "../../styles";

export const FooterWrapper = styled.footer`
  background: var(--background);
  border-top: 1px solid color-mix(in oklab, var(--primary) 20%, transparent);
  padding: 48px 24px;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${sizes.maxWidth || "1200px"};
`;

export const Grid = styled.div`
  display: grid;
  gap: 32px;
  margin-bottom: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Brand = styled.div`
  h2, span {
    font-size: ${fontSizes.large};
    color: var(--foreground);
    font-weight: bold;
  }

  p {
    margin-top: 8px;
    font-size: ${fontSizes.small};
    color: var(--muted-foreground);
  }
`;

export const Section = styled.div`
  h4 {
    color: var(--foreground);
    font-weight: 600;
    margin-bottom: 16px;
    font-size: ${fontSizes.medium};
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  a {
    font-size: ${fontSizes.small};
    text-decoration: none;
    color: var(--muted-foreground);
    transition: 0.25s ease;

    &:hover {
      color: var(--primary);
    }
  }
`;

export const BottomBar = styled.div`
  padding-top: 32px;
  border-top: 1px solid color-mix(in oklab, var(--primary) 10%, transparent);

  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  p {
    font-size: ${fontSizes.small};
    color: var(--muted-foreground);
  }

  a {
    font-size: ${fontSizes.small};
    text-decoration: none;
    color: var(--muted-foreground);
    transition: 0.25s;

    &:hover {
      color: var(--primary);
    }
  }

  .links {
    display: flex;
    gap: 24px;
  }
`;
