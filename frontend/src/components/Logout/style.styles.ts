import styled from "styled-components";
import {Colors} from "../../shared/Colors/style.styles";

export const LogoutButton = styled.button`
    background: none;
    border: none;
  color: ${Colors.white};
  font: unset;
  cursor: pointer;
  :focus {outline:0;}
    `

export const Loader = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #eb4d4b;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  -webkit-animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
    `