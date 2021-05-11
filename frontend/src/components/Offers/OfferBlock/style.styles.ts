import styled from "styled-components";

interface IBox {
  background: string;
}

export const Box = styled.div<IBox>`
  width: 250px;
  height: 250px;
  margin-left: 20px;
  margin-bottom: 20px;
  background: ${(props) => `url(${props.background})`};
  background-size: cover;
  display: flex;
  -webkit-box-shadow: inset -3px 1px 37px 5px rgba(0, 0, 0, 0.68);
  box-shadow: inset -3px 1px 37px 5px rgba(0, 0, 0, 0.68);
  flex-direction: column;
  color: #fff;
`;

export const Price = styled.span`
  margin-top: auto;
  margin-left: 5px;
`;

export const Title = styled.span`
  margin-left: 5px;
  margin-bottom: 5px;
`;
