import styled from "styled-components";

export const Box = styled.div`
  width: 250px;
  height: 250px;
  margin-left: 20px;
  margin-bottom: 20px;
  background: url("https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg");
  background-size: cover;
  display: flex;
  -webkit-box-shadow: inset -3px 1px 37px 5px rgba(0, 0, 0, 0.68);
  box-shadow: inset -3px 1px 37px 5px rgba(0, 0, 0, 0.68);
  flex-direction: column;
`;

export const Price = styled.span`
  margin-top: auto;
  margin-left: 5px;
`;

export const Title = styled.span`
  margin-left: 5px;
  margin-bottom: 5px;
`;
