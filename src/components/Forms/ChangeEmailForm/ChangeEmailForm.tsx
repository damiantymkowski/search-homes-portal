import React from "react";
import * as Styled from "../../../shared/Global/UserPanel/style.styles";
import useChangePassword from "../../../hooks/useChangePassword";
import useChangeEmail from "../../../hooks/useChangeEmail";

const ChangeEmailForm = () => {
  const {
    handleInputChange,
    errors,
    handleSubmit,
    changeInfo,
  } = useChangeEmail({
    userPassword: "",
    newEmail: "",
  });
  return (
    <>
      <Styled.Title>Zmiana adresu E-mail</Styled.Title>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Container smallBox={true}>
          <Styled.Label htmlFor="userPassword">Aktualne hasło</Styled.Label>
          <Styled.Label htmlFor="newEmail">Nowy email</Styled.Label>
          <Styled.Input
            onChange={handleInputChange}
            id="userPassword"
            name="userPassword"
          ></Styled.Input>
          <Styled.Input
            onChange={handleInputChange}
            id="newEmail"
            name="newEmail"
          ></Styled.Input>
        </Styled.Container>
        <Styled.Button>Zmień e-mail</Styled.Button>
      </Styled.Form>
      {changeInfo}
    </>
  );
};

export default ChangeEmailForm;
