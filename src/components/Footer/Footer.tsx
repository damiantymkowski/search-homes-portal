import React from "react";
import * as Styled from "./style.styles";

const Footer = () => {
  return (
    <>
      <Styled.Footer>
        <Styled.Brand>nowyDom.pl</Styled.Brand>
        <Styled.Box>
          <Styled.BoxSet>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
          </Styled.BoxSet>
          <Styled.BoxSet>
            <Styled.BoxText>Najczęściej szukane</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
            <Styled.BoxText>Lorem Ipsum</Styled.BoxText>
          </Styled.BoxSet>
          <Styled.BoxSet>
            <Styled.BoxImg src={"https://i.imgur.com/bTOlbP1.png"} />
          </Styled.BoxSet>
        </Styled.Box>
      </Styled.Footer>
    </>
  );
};

export default Footer;
