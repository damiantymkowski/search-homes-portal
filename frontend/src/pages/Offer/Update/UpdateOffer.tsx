import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import * as Global from "../../../shared/Global/style.styles";
import HandleOffer from "../../../components/Forms/CreateOffer/HandleOffer";
import { useParams } from "react-router";

interface ParamTypes {
  id: string;
}

const UpdateOffer = () => {
  let { id } = useParams<ParamTypes>();
  return (
    <>
      <Header />
      <Global.Container>
        <HandleOffer postId={id} action={"savePostEdited"} />
      </Global.Container>
      <Footer />
    </>
  );
};

export default UpdateOffer;
