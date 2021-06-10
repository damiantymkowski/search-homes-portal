import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as Styled from "./style.styles";
import * as Global from "../../shared/Global/style.styles";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm/ChangePasswordForm";
import ChangeEmailForm from "../../components/Forms/ChangeEmailForm/ChangeEmailForm";
import ChangeUserDetailsForm from "../../components/Forms/ChangeUserDetailsForm/ChangeUserDetailsForm";
import { Breadcrumb, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import DeleteUserOffer from "../../components/Forms/DeleteUserOffer/DeleteUserOffer";

const User = () => {
  return (
    <>
      <Header />
      <Global.Container>
        <Breadcrumb>
          <LinkContainer to="/mojekonto" exact>
            <Breadcrumb.Item active>Moje konto</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to="/wiadomosci" exact>
            <Breadcrumb.Item>Wiadomości</Breadcrumb.Item>
          </LinkContainer>
        </Breadcrumb>
        <Styled.Box>
          <Styled.Content>
            <DeleteUserOffer />
            <ChangePasswordForm />
            <ChangeEmailForm />
            <ChangeUserDetailsForm />
          </Styled.Content>
        </Styled.Box>
        <Footer />
      </Global.Container>
    </>
  );
};

export default User;
