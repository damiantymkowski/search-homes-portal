import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Styled from "./style.styles";
import useLogin from "../../../hooks/useLogin";
import { Eye, EyeOff } from "react-feather";
import { SessionContext } from "../../../App";
import { Redirect, useHistory } from "react-router-dom";

const LoginForm = () => {
  const { handleInputChange, handleSubmit, loginInfo } = useLogin({
    email: "",
    password: "",
  });
  const [displayPassword, setDisplayPassword] = useState(false);
  const passwordInput = useRef() as MutableRefObject<HTMLInputElement>;
  const session = useContext(SessionContext);

  const showPassword = () => {
    if (!displayPassword) {
      passwordInput.current.type = "text";
      setDisplayPassword(true);
    } else {
      passwordInput.current.type = "password";
      setDisplayPassword(false);
    }
  };
  console.log(session);

  if (session === false && loginInfo != "Pomyślnie zalogowano!") {
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
                ref={passwordInput}
              ></Styled.Input>
              <Styled.ShowPassword>
                <Styled.ShowPasswordBtn onClick={showPassword}>
                  {displayPassword ? <EyeOff /> : <Eye />}
                </Styled.ShowPasswordBtn>
              </Styled.ShowPassword>
            </Styled.InputContainer>
            {/*   <Styled.forgotPassword>Nie pamiętam hasła</Styled.forgotPassword>*/}
            <Styled.LoginButton>Zaloguj się</Styled.LoginButton>
            <Styled.LoginInfo>{loginInfo}</Styled.LoginInfo>
          </Styled.Form>
        </Styled.Box>
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default LoginForm;
