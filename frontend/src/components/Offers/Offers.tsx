import React, { useEffect, useState } from "react";
import * as Styled from "./style.styles";
import OfferBlock from "./OfferBlock/OfferBlock";
import axios from "axios";
import { Link } from "react-feather";
import { Spinner } from "react-bootstrap";

interface IOffer {
  id: number;
  title: string;
  price: number;
  miniature: string;
}

const Offers = () => {
  const defaultPosts: IOffer[] = [];
  const [offers, setOffers]: [IOffer[], (offers: IOffer[]) => void] = useState(
    defaultPosts
  );
  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  useEffect(() => {
    axios
      .post<IOffer[]>("mainPage.php", {
        action: "printOffers",
        from: 0,
        amount: 100,
      })
      .then((res: any) => {
        setOffers(res.data.actualOffers);
        setLoading(false);
      })
      .catch((ex) => {
        console.log(ex);
        const error =
          ex.res.status === 404
            ? "Resource Not found"
            : "An unexpected error has occured";
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {}, []);

  if (loading) {
    return (
      <>
        <Styled.Title>Najnowsze oferty</Styled.Title>
        <Styled.Container>
          <Spinner animation="border" role="status"></Spinner>
        </Styled.Container>
      </>
    );
  } else {
    return (
      <>
        <Styled.Title>Najnowsze oferty</Styled.Title>
        <Styled.Container>
          {offers.map((offer: IOffer) => (
            <OfferBlock
              id={offer.id}
              price={offer.price}
              title={offer.title}
              miniature={offer.miniature}
            />
          ))}
        </Styled.Container>
      </>
    );
  }
};
export default Offers;
