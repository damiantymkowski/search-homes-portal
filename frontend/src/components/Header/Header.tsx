import React, {useContext, useEffect, useReducer, useState} from "react";
import * as Styled from "./style.styles";
import Logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import {AuthContext} from "../../App";

const Header = () => {
const {state} = React.useContext(AuthContext);
  if (state.isAuthenticated === false) {
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
              <Link to="/logowanie">Zaloguj się </Link>
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
            <Styled.NavItem>
           <Logout/>
            </Styled.NavItem>
          </Styled.Navbar>
        </Styled.Nav>
      </>
    );
  }
};

export default Header;
