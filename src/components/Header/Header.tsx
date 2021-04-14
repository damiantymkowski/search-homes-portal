import React, { useContext, useEffect, useState } from "react";
import * as Styled from "./style.styles";
import Logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import { SessionContext } from "../../App";
import { getSessionCookie } from "../../shared/sessions";

const Header = () => {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(() => {
    setSession(getSessionCookie());
  }, [session]);
  if (session === undefined) {
    return (
      <>
        <Styled.Nav>
          <Link to="/">
            <Styled.Brand src={Logo} />
          </Link>
          <Styled.Navbar>
            <Styled.NavItem>
              Ogłoszenia <Styled.Caret />
            </Styled.NavItem>
            <Styled.NavItem>
              Popularne miejsca <Styled.Caret />
            </Styled.NavItem>
            <Styled.NavItem rightAlign={true}>
              <Link to="/logowanie">Zaloguj się</Link>
            </Styled.NavItem>
            <Styled.NavItem>
              <Link to="/rejestracja">Zarejestruj się</Link>
            </Styled.NavItem>
          </Styled.Navbar>
        </Styled.Nav>
      </>
    );
  } else {
    return (
      <>
        <Styled.Nav>
          <Link to="/">
            <Styled.Brand src={Logo} />
          </Link>
          <Styled.Navbar>
            <Styled.NavItem>
              Ogłoszenia <Styled.Caret />
            </Styled.NavItem>
            <Styled.NavItem>
              Popularne miejsca <Styled.Caret />
            </Styled.NavItem>
            <Styled.NavItem rightAlign={true}>
              <Link to="/mojekonto">Moje konto</Link>
            </Styled.NavItem>
            <Styled.NavItem>
              <Link to="/rejestracja">Dodaj ogłoszenie</Link>
            </Styled.NavItem>
          </Styled.Navbar>
        </Styled.Nav>
      </>
    );
  }
};

export default Header;
