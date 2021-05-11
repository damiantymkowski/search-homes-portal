import styled from "styled-components";
import { Nav as Link } from "react-bootstrap";

export const NavLink = styled(Link)`
  &:hover {
    cursor: pointer;
  }
  a {
    color: unset !important;
  }
`;
