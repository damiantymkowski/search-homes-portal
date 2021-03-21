import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  width: 75%;
  margin-top: 120px;
  background-color: #130f40;
  min-height: 500px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 110px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 60%;
`;

export const InputText = styled.label`
  color: #fff;
  font-weight: 500;
  text-align: right;
  width: 20%;
  margin-right: 5px;
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
`;

export const PolicyText = styled.span`
  margin-top: 25px;
  margin-left: 5px;
`;

export const PolicyCheckbox = styled.input`
  -webkit-appearance: none;
  background-color: #fff;
  border: 1px solid #cacece;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 9px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
  cursor: pointer;

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
  background: #6ab04c;
  margin-left: 11%;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 100;
`;
