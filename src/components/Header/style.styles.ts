import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  background-color: #535c68;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const Brand = styled.img`
  height: 30px;
`;

export const Navbar = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
  margin-left: 5px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const Caret = styled.span`
  display: inline-block;
  margin-left: 5px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px dashed;
`;
