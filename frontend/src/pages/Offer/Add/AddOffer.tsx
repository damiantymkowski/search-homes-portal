import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import * as Global from "../../../shared/Global/style.styles";
import CreateOffer from "../../../components/Forms/CreateOffer/CreateOffer";

const AddOffer = () => {
  return (
    <>
      <Header />
      <Global.Container>
        <CreateOffer />
      </Global.Container>
      <Footer />
    </>
  );
};

export default AddOffer;
