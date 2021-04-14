import styled from "styled-components";
import subHeader_background from "../../../assets/img/subHeader_background.jpg";

export const Container = styled.div`
  background-image: url(${subHeader_background});
  height: 450px;
  background-size: cover;
  background-position-y: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 2.5em;
  @media (max-width: 1000px) {
    font-size: 1.5em;
  }
`;

export const SubTitle = styled.h2`
  font-size: 1.5em;
  margin-top: 3px;
  font-weight: 200;
  @media (max-width: 1000px) {
    font-size: 1.2em;
  }
`;

export const Slogan = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
