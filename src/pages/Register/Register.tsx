import React from "react";
import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import * as Styled from "./style.styles";

const Register = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <RegisterForm />
      </Styled.Container>
    </>
  );
};

export default Register;
