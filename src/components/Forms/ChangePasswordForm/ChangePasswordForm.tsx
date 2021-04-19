import React from "react";
import * as Styled from "../../../shared/Global/UserPanel/style.styles";
import useChangePassword from "../../../hooks/useChangePassword";
const ChangePasswordForm = () => {
  const {
    handleInputChange,
    errors,
    handleSubmit,
    changeInfo,
  } = useChangePassword({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  return (
    <>
      <Styled.Title>Zmiana hasła</Styled.Title>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Container>
          <Styled.Label htmlFor="currentPassword">Aktualne hasło</Styled.Label>
          <Styled.Label htmlFor="newPassword">Nowe hasło</Styled.Label>
          <Styled.Label htmlFor="repeatNewPassword">
            Powtórz nowe hasło
          </Styled.Label>
          <Styled.Input
            onChange={handleInputChange}
            id="currentPassword"
            name="currentPassword"
          ></Styled.Input>
          <Styled.Input
            onChange={handleInputChange}
            id="newPassword"
            name="newPassword"
          ></Styled.Input>
          <Styled.Input
            onChange={handleInputChange}
            id="repeatPassword"
            name="repeatPassword"
          ></Styled.Input>
        </Styled.Container>
        <Styled.Button>Zmień hasło</Styled.Button>
      </Styled.Form>
      {changeInfo}
      {errors.repeatPassword}
    </>
  );
};

export default ChangePasswordForm;
