import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  background: #111;
  color: #fff;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  box-shadow: 0 0 20px #0004;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  margin: 15px 0 8px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-bottom: 10px;
  background: #222;
  color: #fff;
  font-size: 16px;

  &:focus {
    border: 1px solid #555;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #6c47ff;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 17px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

export const Box = styled.div`
  background: #1a1a1a;
  padding: 20px;
  border-radius: 10px;
  margin-top: 25px;
`;

export const CodeBox = styled.pre`
  background: #000;
  padding: 15px;
  border-radius: 10px;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 14px;
  margin-top: 10px;
`;
