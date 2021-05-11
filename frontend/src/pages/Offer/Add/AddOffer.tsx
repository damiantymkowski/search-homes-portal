import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import * as Global from "../../../shared/Global/style.styles";
import HandleOffer from "../../../components/Forms/CreateOffer/HandleOffer";

const AddOffer = () => {
  return (
    <>
      <Header />
      <Global.Container>
        <HandleOffer action={"savePostNew"} />
      </Global.Container>
      <Footer />
    </>
  );
};

export default AddOffer;
