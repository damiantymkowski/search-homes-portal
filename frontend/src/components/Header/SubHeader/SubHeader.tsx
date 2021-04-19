import * as Styled from "./style.styles";
import Search from "../Search/Search";
import React from "react";

const SubHeader = () => {
  return (
    <>
      <Styled.Container>
        <Styled.Slogan>
          <Styled.Title>Tutaj zaczniesz swoją historię</Styled.Title>
          <Styled.SubTitle>
            Najlepszy serwis nieruchomości w sieci
          </Styled.SubTitle>
        </Styled.Slogan>
        <Search />
      </Styled.Container>
    </>
  );
};

export default SubHeader;
