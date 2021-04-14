import styled from "styled-components";
import { Colors } from "../../../shared/Colors/style.styles";

export const Input = styled.input`
  height: 30px;
  border: 1px solid #bcbcbc;
  width: 100%;
  padding: 0;
`;

interface ContainerProps {
  smallBox?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.smallBox ? "1fr 1fr" : "1fr 1fr 1fr"};
  grid-gap: 15px;
`;

export const Form = styled.form`
  position: relative;
`;

export const Title = styled.h3`
  color: #000;
  font-weight: 200;

  &::after {
    display: block;
    content: "";
    border-bottom: 1px solid rgba(165, 165, 165, 0.25);
  }
`;

export const Button = styled.button`
  width: 100px;
  margin-top: 5px;
  border: none;
  color: ${Colors.white};
  padding: 10px;
  cursor: pointer;
  background-color: ${Colors.pure_apple};
`;

export const Label = styled.label`
  margin-bottom: -10px;
  font-size: 13px;
`;
