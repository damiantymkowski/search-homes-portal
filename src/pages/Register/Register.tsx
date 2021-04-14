import React from "react";
import Header from "../../components/Header/Header";
import RegisterForm from "../../components/Forms/RegisterForm/RegisterForm";
import * as Styled from "./style.styles";
import Footer from "../../components/Footer/Footer";
import * as Global from "../../shared/Global/style.styles";

const Register = () => {
  return (
    <>
      <Header />
      <Global.Container>
        <Styled.RegisterBox>
          <Styled.HeaderRegister>
            <Styled.HeaderText>Zarejestruj się</Styled.HeaderText>
          </Styled.HeaderRegister>
          <RegisterForm />
        </Styled.RegisterBox>
        <Footer />
      </Global.Container>
    </>
  );
};

export default Register;
