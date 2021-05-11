import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as Global from "../../shared/Global/style.styles";
import Advertisement from "../../components/Advertisement/Advertisement";
import { useParams } from "react-router";

interface ParamTypes {
  id: string;
}

const Offer = () => {
  const { id } = useParams<ParamTypes>();
  return (
    <>
      <Header />
      <Global.Container>
        <Advertisement offer_id={id} />
      </Global.Container>
      <Footer />
    </>
  );
};

export default Offer;
