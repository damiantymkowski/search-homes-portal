import styled from "styled-components";
import { Colors } from "../../../shared/Colors/style.styles";

export const Box = styled.div`
  width: 60%;
  background-color: ${Colors.deepWhite};
  min-height: 150px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  @media (max-width: 1290px) {
    width: 90%;
    margin-top: 50px;
  }
`;

export const SearchForm = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media (max-width: 1290px) {
    align-items: unset;
    justify-content: unset;
  }
`;

export const SearchInput = styled.select`
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
  width: 15%;
  border: 1px solid #c6c6c6;
  @media (max-width: 1290px) {
    margin-left: 5px;
    width: 37.7%;
  }
`;

export const SearchCity = styled.input`
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #c6c6c6;
  width: 35%;
  @media (max-width: 1290px) {
    width: 75%;
    margin-top: 5px;
    margin-left: 5px;
  }
`;

export const SearchButton = styled.button`
  padding: 11px;
  width: 20%;
  border: none;
  color: ${Colors.white};
  background: ${Colors.caramine_pink};
  @media (max-width: 1290px) {
    margin-left: 5px;
    margin-top: 5px;
  }
`;

export const SearchTag = styled.div`
  background-color: ${Colors.deepWhite};
  padding: 10px;
  position: absolute;
  align-items: self-start;
  left: -2%;
  top: -5%;
  width: 25%;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.2);
  box-shadow: 5px 5px 7px 0px rgb(0 0 0 / 20%);
  color: ${Colors.caramine_pink};
  text-align: center;
  font-size: 0.9em;
  @media (max-width: 1290px) {
    top: -20%;
  }
`;
