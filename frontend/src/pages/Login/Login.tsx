import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import * as Styled from "./style.styles";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import Footer from "../../components/Footer/Footer";
import * as Global from "../../shared/Global/style.styles";

const Login = () => {
  return (
    <>
      <Header />
      <Global.Container>
        <Styled.LoginBox>
          <Styled.HeaderLogin>
            <Styled.HeaderText>Logowanie</Styled.HeaderText>
          </Styled.HeaderLogin>
          <LoginForm />
        </Styled.LoginBox>
        <Footer />
      </Global.Container>
    </>
  );
};

export default Login;
