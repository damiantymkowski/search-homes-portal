import styled from "styled-components";
import { Colors } from "../../shared/Colors/style.styles";

export const Box = styled.div`
  display: flex;
  width: 40%;
  margin-top: 30px;
  background-color: ${Colors.deep_cove};
  min-height: 350px;
  align-items: center;
  margin-bottom: 80px;
  @media (max-width: 1000px) {
    width: 95%;
  }
`;
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const InputText = styled.label`
  color: #fff;
  font-weight: 500;
  text-align: right;
  margin-right: 5px;
  @media (max-width: 1000px) {
    width: 100%;
    text-align: left;
  }
`;
export const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  border: none;
  height: 35px;
`;
export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 50px;
  @media (max-width: 720px) {
    padding: 20px;
  }
  div:first-child {
    margin-top: unset;
  }
`;

export const LoginButton = styled.button`
  height: 35px;
  border-radius: 3px;
  margin-top: 35px;
  cursor: pointer;
  width: calc(100% - 45px);
  margin-left: 45px;
  background: ${Colors.pure_apple};
  border: none;
  color: ${Colors.white};
  font-size: 18px;
  font-weight: 100;
  @media (max-width: 1000px) {
    width: 100%;
    margin-left: unset;
  }
`;

export const LoginInfo = styled.span`
  color: ${Colors.pure_apple};
  margin-left: 45px;
  margin-top: 5px;
  @media (max-width: 1000px) {
    margin-left: unset;
  }
`;
