import React from "react";
import Header from "../../components/Header/Header";
import * as Styled from "./style.styles";
import SubHeader from "../../components/Header/SubHeader/SubHeader";
import Offers from "../../components/Offers/Offers";
import Footer from "../../components/Footer/Footer";

const Homepage = () => {
  return (
    <>
      <Header />
      <SubHeader />
      <Styled.Container>
        <Offers />
        <Styled.Section>
          <Styled.SectionText small={false}>
            Sprzedaj lub wynajmij {"\n"}
            swój dom razem z nami!
          </Styled.SectionText>
          <Styled.SectionText small={true}>
            Damy Ci najwyższą skuteczności zasięg spośród wszystkich portali!
          </Styled.SectionText>
        </Styled.Section>
        <Footer />
      </Styled.Container>
    </>
  );
};

export default Homepage;
