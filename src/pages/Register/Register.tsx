import React from "react";
import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import * as Styled from "./style.styles";
import Footer from "../../components/Footer/Footer";

const Register = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.RegisterBox>
          <Styled.HeaderRegister>
            <Styled.HeaderText>Zarejestruj się</Styled.HeaderText>
          </Styled.HeaderRegister>
          <RegisterForm />
        </Styled.RegisterBox>
        <Footer />
      </Styled.Container>
    </>
  );
};

export default Register;
