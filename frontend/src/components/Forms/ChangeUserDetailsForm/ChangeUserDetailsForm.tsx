import React from "react";
import * as Styled from "../../../shared/Global/UserPanel/style.styles";
import useChangeUserDetails from "../../../hooks/useChangeUserDetails";

const ChangeUserDetailsForm = () => {
  const { handleInputChange, handleSubmit, changeInfo } = useChangeUserDetails({
    name: "",
    number: "",
  });

  return (
    <>
      <Styled.Title>Zmiana danych kontaktowych</Styled.Title>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Container smallBox={true}>
          <Styled.Label htmlFor="name">Imię</Styled.Label>
          <Styled.Label htmlFor="number">Telefon kontaktowy</Styled.Label>
          <Styled.Input
            onChange={handleInputChange}
            id="name"
            name="name"
          ></Styled.Input>
          <Styled.Input
            onChange={handleInputChange}
            id="number"
            name="number"
          ></Styled.Input>
        </Styled.Container>
        <Styled.Button>Zmień dane</Styled.Button>
      </Styled.Form>
      {changeInfo}
    </>
  );
};

export default ChangeUserDetailsForm;
