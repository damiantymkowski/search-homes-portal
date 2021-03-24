import React from "react";
import Header from "../../components/Header/Header";
import * as Styled from "./style.styles";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.HeaderLogin>
          <Styled.HeaderText>Logowanie</Styled.HeaderText>
        </Styled.HeaderLogin>
        <LoginForm />
      </Styled.Container>
    </>
  );
};

export default Login;
