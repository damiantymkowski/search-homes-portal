import React from "react";
import * as Styled from "./style.styles";

import { NavLink } from "react-router-dom";

interface IOffer {
  id: number;
  title: string;
  miniature: string;
  price: number;
}

const OfferBlock = (props: IOffer) => {
  return (
    <>
      <NavLink to={"/ogloszenie" + props.id}>
        <Styled.Box background={props.miniature}>
          <Styled.Price>{props.price}</Styled.Price>
          <Styled.Title>{props.title}</Styled.Title>
        </Styled.Box>
      </NavLink>
    </>
  );
};
export default OfferBlock;
