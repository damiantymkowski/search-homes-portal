import React, { useEffect, useState } from "react";
import * as Styled from "./style.styles";
import axios from "axios";
import ImageGallery from "react-image-gallery";
import { LatLngExpression } from "leaflet";
import Map from "../Map/Map";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import SendOfferMessageForm from "../Forms/SendOfferMessageForm/SendOfferMessageForm";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [position, setPosition] = useState([5, 4] as LatLngExpression);
  const [show, setShow] = useState(false);
  const [infoReport, setInfoReport] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    axios({
      method: "post",
      url: "report.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        postId: parseInt(props.offer_id),
        description: data.description,
        action: "addReport",
      },
      withCredentials: true,
    }).then((response) => {
      if (response.data.response == "reportAdded")
        setInfoReport("Zgłoszenie wysłane");
    });
  };

  if (loading == false) {
    return (
      <>
        <Styled.Container>
          <Styled.OfferContainer>
            <Styled.Title>{info.title}</Styled.Title>
            <Styled.Report>
              <Button variant="warning" onClick={handleShow}>
                Zgłoś ogłoszenie
              </Button>
            </Styled.Report>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Formularz zgłoszenia</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Treść zgłoszenia</Form.Label>
                    <Form.Control
                      {...register("description", { required: true })}
                      as="textarea"
                      rows={3}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Wyślij zgłoszenie
                  </Button>
                  {infoReport}
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Zamknij
                </Button>
              </Modal.Footer>
            </Modal>
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
          </Styled.OfferContainer>
          <Styled.FormContainer>
            <SendOfferMessageForm offer_id={props.offer_id} />
          </Styled.FormContainer>
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
