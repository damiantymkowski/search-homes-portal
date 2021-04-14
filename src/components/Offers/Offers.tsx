import React from "react";
import * as Styled from "./style.styles";
import OfferBlock from "./OfferBlock/OfferBlock";

const Offers = () => {
  return (
    <>
      <Styled.Title>Najnowsze oferty</Styled.Title>
      <Styled.Container>
        <OfferBlock />
        <OfferBlock />
        <OfferBlock />
      </Styled.Container>
      <Styled.Container>
        <OfferBlock />
        <OfferBlock />
        <OfferBlock />
      </Styled.Container>
    </>
  );
};
export default Offers;
