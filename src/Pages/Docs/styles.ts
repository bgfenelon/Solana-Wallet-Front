import styled from "styled-components"

export const Section = styled.section`
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  background-color: #120720;

  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 2rem;
  }
`

export const Space = styled.div`
  width: 100%;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`

export const Card = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(140, 17, 255, 0.81);
  border-radius: 0.75rem;
  padding: 15px 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    padding: 15px 1rem;
  }
`

export const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
  margin-bottom: 0.75rem;

  img {
    display: block;
    width: 50px;

    @media (max-width: 480px) {
      width: 36px;
    }
  }
`

export const Description = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

export const CodeBlock = styled.div`
  background: rgba(0, 0, 0, 0.2);
  color: #4ade80;
  font-family: monospace;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  overflow-x: auto;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`

export const CodeLine = styled.div<{ highlight?: boolean }>`
  color: ${(props) => (props.highlight ? "#60a5fa" : "#4ade80")};
`

export const List = styled.ul`
  list-style: disc;
  margin-left: 1.25rem;
  color: #9ca3af;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

export const Container = styled.div`
  padding: 30px 25px;
  max-width: 1024px;
  margin: 30px auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  div.flex {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 30px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 20px 0;
    }
  }

  &.dark-purple {
    background-color: #0d0516;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    margin: 20px auto;
  }
`
