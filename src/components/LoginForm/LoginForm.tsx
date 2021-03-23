import React from "react";
import * as Styled from "./style.styles";
import Logo from "../../assets/img/Logo.svg";
import useLogin from "../../hooks/useLogin";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { handleInputChange, handleSubmit, loginInfo } = useLogin({
    email: "",
    password: "",
  });
  const { isLogged } = useAuth();

  if (!isLogged) {
    return (
      <>
        <Styled.Box>
          <Styled.Form onSubmit={handleSubmit}>
            <Styled.InputContainer>
              <Styled.InputText>Email</Styled.InputText>
              <Styled.Input
                onChange={handleInputChange}
                name="email"
              ></Styled.Input>
            </Styled.InputContainer>
            <Styled.InputContainer>
              <Styled.InputText>Hasło</Styled.InputText>
              <Styled.Input
                onChange={handleInputChange}
                type="password"
                name="password"
              ></Styled.Input>
            </Styled.InputContainer>

            <Styled.LoginButton>Zaloguj się</Styled.LoginButton>
            <Styled.LoginInfo>{loginInfo}</Styled.LoginInfo>
          </Styled.Form>
        </Styled.Box>
      </>
    );
  } else {
    return <>Jesteś już zalogowany!</>;
  }
};

export default LoginForm;
