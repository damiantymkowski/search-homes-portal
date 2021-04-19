import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as Styled from "./style.styles";
import * as Global from "../../shared/Global/style.styles";
import ChangePasswordForm from "../../components/Forms/ChangePasswordForm/ChangePasswordForm";
import ChangeEmailForm from "../../components/Forms/ChangeEmailForm/ChangeEmailForm";

const User = () => {
  return (
    <>
      <Header />
      <Global.Container>
        <Styled.Box>
          <Styled.Content>
            <ChangePasswordForm />
            <ChangeEmailForm />
          </Styled.Content>
        </Styled.Box>
        <Footer />
      </Global.Container>
    </>
  );
};

export default User;
