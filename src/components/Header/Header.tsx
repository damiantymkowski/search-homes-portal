import React from "react";
import * as Styled from "./style.styles";
import Logo from "../../assets/img/Logo.svg";

const Header = () => {
  return (
    <>
      <Styled.Nav>
        <Styled.Brand src={Logo} />
        <Styled.Navbar>
          <Styled.NavItem>
            Ogłoszenia <Styled.Caret />
          </Styled.NavItem>
        </Styled.Navbar>
      </Styled.Nav>
    </>
  );
};

export default Header;
