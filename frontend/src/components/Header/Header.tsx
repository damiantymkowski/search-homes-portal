import React, { useContext, useEffect, useReducer, useState } from "react";
import * as Styled from "./style.styles";
import Logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { AuthContext } from "../../App";
import { LinkContainer } from "react-router-bootstrap";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
  const { state } = React.useContext(AuthContext);
  if (state.isAuthenticated === false) {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Styled.NavLink>
              <LinkContainer to="/">
                <Styled.NavLink>nowyDom.pl</Styled.NavLink>
              </LinkContainer>
            </Styled.NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Popularne miejsca</Nav.Link>
              <NavDropdown title="Ogłoszenia" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Coś</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Coś</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Coś</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Coś</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link ml-auto href="#deets">
                <LinkContainer to="/logowanie">
                  <Styled.NavLink>Zaloguj się</Styled.NavLink>
                </LinkContainer>
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <LinkContainer to="/rejestracja">
                  <Styled.NavLink>Rejestracja</Styled.NavLink>
                </LinkContainer>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <Styled.NavLink>
              <LinkContainer to="/">
                <Styled.NavLink>nowyDom.pl</Styled.NavLink>
              </LinkContainer>
            </Styled.NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Popularne miejsca</Nav.Link>
              <NavDropdown title="Ogłoszenia" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Coś</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Coś</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Coś</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Coś</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link ml-auto href="#deets">
                <LinkContainer to="/dodaj-ogloszenie">
                  <Styled.NavLink>Dodaj ogłoszenie</Styled.NavLink>
                </LinkContainer>
              </Nav.Link>
              <Nav.Link eventKey={2}>
                <LinkContainer to="/mojekonto">
                  <Styled.NavLink>Moje konto</Styled.NavLink>
                </LinkContainer>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
};

export default Header;
