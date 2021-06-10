import React, { FormEvent, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import * as Styled from "../Homepage/style.styles";
import OfferBlock from "../../components/Offers/OfferBlock/OfferBlock";
import Footer from "../../components/Footer/Footer";

const SearchResult = () => {
  useEffect(() => {
    axios({
      method: "get",
      url: "search.php",
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {});
  }, []);

  return (
    <>
      <Header />
      <Styled.Container>
        {/*    {offers.map((offer: IOffer) => (
          <OfferBlock
            id={offer.id}
            price={offer.price}
            title={offer.title}
            miniature={offer.miniature}
          />
        ))}*/}
        <Footer />
      </Styled.Container>
    </>
  );
};

export default SearchResult;
