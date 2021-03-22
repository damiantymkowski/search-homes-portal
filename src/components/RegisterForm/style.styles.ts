import styled from "styled-components";
import { Colors } from "../../shared/Colors/style.styles";

export const Box = styled.div`
  display: flex;
  width: 75%;
  margin-top: 30px;
  background-color: ${Colors.deep_cove};
  min-height: 500px;
  @media (max-width: 720px) {
    width: 95%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 110px;
  @media (max-width: 720px) {
    padding: 20px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 60%;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
  }
`;
export const PolicyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 60%;
  @media (max-width: 1000px) {
    margin-top: unset;
    width: 100%;
  }
`;
export const InputText = styled.label`
  color: #fff;
  font-weight: 500;
  text-align: right;
  width: 20%;
  margin-right: 5px;
  @media (max-width: 1000px) {
    width: 100%;
    text-align: left;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
`;

export const PolicyText = styled.span`
  margin-top: 25px;
  margin-left: 5px;
  font-size: 0.8em;
`;

export const PolicyCheckbox = styled.input`
  -webkit-appearance: none;
  background-color: ${Colors.white};
  border: 1px solid #cacece;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 9px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  @media (max-width: 1000px) {
    @supports (-webkit-touch-callout: none) {
      -webkit-appearance: checkbox;
    }
  }
  &:checked {
    background-color: #e9ecee;
    border: 1px solid #adb8c0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05),
      inset 15px 10px -12px rgba(255, 255, 255, 0.1);
    color: #99a1a7;
  }

  &:checked:after {
    content: "\\2714";
    font-size: 14px;
    position: absolute;
    top: 0px;
    left: 3px;
    color: #000000;
    @media (max-width: 1000px) {
      @supports (-webkit-touch-callout: none) {
        content: unset;
      }
    }
  }

  &:focus {
    outline: 0;
  }
`;

export const RegisterButton = styled.button`
  height: 35px;
  margin-top: 25px;
  cursor: pointer;
  width: 48%;
  background: ${Colors.pure_apple};
  margin-left: 11%;
  border: none;
  color: ${Colors.white};
  font-size: 18px;
  font-weight: 100;
  @media (max-width: 720px) {
    width: 100%;
    margin-left: unset;
  }
`;

export const ErrorText = styled.span`
  color: ${Colors.caramine_pink};
  margin-left: 10.2%;
  margin-top: 5px;
`;
