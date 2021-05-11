import React, { useEffect, useState } from "react";
import * as Styled from "./style.styles";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import Map from "../Map/Map";
import { Spinner } from "react-bootstrap";

interface infoType {
  Price: string;
  title: string;
  description: string;
  miniature: string;
}

const Advertisement = (props: { offer_id: string }) => {
  const [info, setInfo] = useState<infoType>({
    title: "",
    Price: "",
    description: "",
    miniature: "",
  });

  const [additionalParams, setAdditionalParams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [position, setPosition] = useState([5, 4] as LatLngExpression);

  useEffect(() => {
    if (additionalParams.length > 0) {
      let cityName = "";
      additionalParams.map((field: any, i) => {
        if (field.name == "Lokalizacja") cityName = field.value;
      });
      axios({
        method: "get",
        url:
          "https://api.opencagedata.com/geocode/v1/json?q=" +
          cityName +
          "&key=bf2520281d4f4341881c25a72c25f95a",
      })
        .then((res) => {
          setPosition([
            res.data.results[0].geometry.lat,
            res.data.results[0].geometry.lng,
          ]);
        })
        .then((res) => {
          console.log(position);
          setLoading(false);
        });
    }
  }, [additionalParams]);

  useEffect(() => {
    axios({
      method: "post",
      url: "postPage.php",
      data: {
        postId: props.offer_id,
        action: "printOffer",
      },
      withCredentials: true,
    })
      .then(function (response) {
        let arrayPhotos = response.data.photos.map((p: any) => ({
          original: p.url,
          thumbnail: p.url,
        }));
        setPhotos(arrayPhotos);

        setInfo(response.data.postInfo);
        setAdditionalParams(response.data.dataInfo);
      })
      .catch(function (error) {});
  }, []);

  if (loading == false) {
    return (
      <>
        <Styled.Container>
          <Styled.Title>{info.title}</Styled.Title>
          <Styled.Localization>
            Warszawa, Śródmieście ul. Ciasna
          </Styled.Localization>

          <Styled.Box>
            <ImageGallery
              infinite={true}
              lazyLoad={true}
              showNav={false}
              items={photos}
            />
          </Styled.Box>
          <Styled.Details>
            <Styled.Title>{info.title}</Styled.Title>
            <Styled.Price>Cena: {info.Price} zł</Styled.Price>
            <Styled.DetatilsTitle>Szczegóły ogłoszenia</Styled.DetatilsTitle>
            {additionalParams.map((field: any, i) => {
              return (
                <Styled.Field>
                  <Styled.Name>{field.name}:</Styled.Name>
                  <Styled.Value>{field.value}</Styled.Value>
                </Styled.Field>
              );
            })}
            <Styled.DetatilsTitle>Opis</Styled.DetatilsTitle>
            <Styled.Description>{info.description}</Styled.Description>
            <Styled.DetatilsTitle>Mapa</Styled.DetatilsTitle>
          </Styled.Details>
          <Map position={position} />
        </Styled.Container>
      </>
    );
  } else {
    return (
      <>
        <Spinner animation="border" role="status"></Spinner>
      </>
    );
  }
};

export default Advertisement;
