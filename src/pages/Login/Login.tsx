import React from "react";
import Header from "../../components/Header/Header";
import * as Styled from "./style.styles";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <LoginForm />
      </Styled.Container>
    </>
  );
};

export default Login;
