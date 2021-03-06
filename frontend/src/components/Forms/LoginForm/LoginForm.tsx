import React, {
  MutableRefObject,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import * as Styled from "./style.styles";
import useLogin from "../../../hooks/useLogin";
import { Eye, EyeOff } from "react-feather";
import { Redirect } from "react-router-dom";
import { initialState, reducer } from "../../../shared/Reducers/AuthReducer";
import { AuthContext } from "../../../App";

const LoginForm = () => {
  const { handleInputChange, handleSubmit, loginInfo } = useLogin({
    email: "",
    password: "",
  });
  const [displayPassword, setDisplayPassword] = useState(false);
  const passwordInput = useRef() as MutableRefObject<HTMLInputElement>;

  const showPassword = (e: any) => {
    e.preventDefault();
    if (!displayPassword) {
      passwordInput.current.type = "text";
      setDisplayPassword(true);
    } else {
      passwordInput.current.type = "password";
      setDisplayPassword(false);
    }
  };
  const { state } = React.useContext(AuthContext);
  if (state.isAuthenticated === false && loginInfo != "Pomyślnie zalogowano!") {
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
                <Styled.ShowPasswordBtn onClick={(e) => showPassword(e)}>
                  {displayPassword ? <EyeOff /> : <Eye />}
                </Styled.ShowPasswordBtn>
              </Styled.ShowPassword>
            </Styled.InputContainer>
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
