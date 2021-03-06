import styled from "styled-components";
import { Colors } from "../../shared/Colors/style.styles";

export const Nav = styled.nav`
  display: flex;
  background-color: #535c68;
  height: 60px;
  align-items: center;

  a {
    text-decoration: none;
    color: ${Colors.white};
  }

  a:hover {
    color: #d4d4d4;
  }
`;

export const Brand = styled.img`
  height: 30px;
  margin-left: 15px;
`;

export const Navbar = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  margin-top: -5px;
  margin-left: 5px;
  width: 100%;
  justify-content: space-between;
  margin-right: 25px;
`;

interface NavItemProps {
  rightAlign?: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 5px;
  margin-left: ${(props) => (props.rightAlign ? "auto" : "unset")};
`;

export const Caret = styled.span`
  display: inline-block;
  margin-left: 5px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px dashed;
`;
