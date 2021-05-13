import Header from "../../components/Header/Header";
import * as Global from "../../shared/Global/style.styles";
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import * as Styled from "../User/style.styles";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";

interface ParamTypes {
  id: string;
}

const Conversation = () => {
  const { id } = useParams<ParamTypes>();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [messages, setMessages] = useState([{}]);

  useEffect(() => {
    axios({
      method: "post",
      url: "contact.php",
      data: {
        convId: id,
        action: "printMsgs",
      },
      withCredentials: true,
    }).then((response) => {
      setMessages(response.data.convsOrMsgs);
      console.log(response);
    });
  }, [success]);

  const onSubmit = (data: any) => {
    axios({
      method: "post",
      url: "contact.php",
      data: {
        convId: id,
        msgContent: data.message_text,
        action: "sendMsgToConv",
      },
      withCredentials: true,
    }).then((response) => {
      if (response.data.response == "msgSent") setSuccess(true);
    });
  };

  return (
    <>
      <Header />
      <Global.Container>
        <Breadcrumb>
          <LinkContainer to="/mojekonto" exact>
            <Breadcrumb.Item>Moje konto</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to="/wiadomosci" exact>
            <Breadcrumb.Item>Wiadomości</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to="/konwersacja" exact>
            <Breadcrumb.Item active>Konwersacja</Breadcrumb.Item>
          </LinkContainer>
        </Breadcrumb>
        <Styled.Box>
          <Styled.Content>
            {messages.map((message: any) => {
              return (
                <>
                  <Card body>
                    <Card.Title>{message.author}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {" "}
                      {new Date(message.date * 1000).toLocaleString()}
                    </Card.Subtitle>
                    {message.content}
                  </Card>
                </>
              );
            })}
            <Form className={"border p-3"} onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    {...register("message_text")}
                    placeholder="Napisz wiadomość..."
                    as="textarea"
                    aria-label="With textarea"
                  />
                </InputGroup>
                <Button type="submit" className={"mt-2"}>
                  Wyślij wiadomość
                </Button>
              </FormGroup>
            </Form>
            {success == true ? (
              <Alert variant="success">Wysłano wiadomość</Alert>
            ) : (
              ""
            )}
          </Styled.Content>
        </Styled.Box>
        <Footer />
      </Global.Container>
    </>
  );
};
export default Conversation;
