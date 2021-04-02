import React from "react";
import Header from "../../components/Header/Header";
import * as Styled from "./style.styles";
import LoginForm from "../../components/LoginForm/LoginForm";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.LoginBox>
          <Styled.HeaderLogin>
            <Styled.HeaderText>Logowanie</Styled.HeaderText>
          </Styled.HeaderLogin>
          <LoginForm />
        </Styled.LoginBox>
        <Footer />
      </Styled.Container>
    </>
  );
};

export default Login;
