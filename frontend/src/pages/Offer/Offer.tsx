import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import * as Global from "../../shared/Global/style.styles"
import Advertisement from "../../components/Advertisement/Advertisement";

const Offer = () => {
    return (
        <>
            <Header />
            <Global.Container>
                <Advertisement/>

            </Global.Container>
            <Footer />
        </>
    );
};

export default Offer;
