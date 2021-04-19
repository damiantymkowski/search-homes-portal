import styled from "styled-components";
import { Colors } from "../../shared/Colors/style.styles";

export const Box = styled.div`
  margin-top: 250px;
  background: ${Colors.deepWhite};
  width: calc(100% - 20px);
  min-height: 450px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  background-color: ${Colors.white};
  width: 50%;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  min-height: 400px;
`;
