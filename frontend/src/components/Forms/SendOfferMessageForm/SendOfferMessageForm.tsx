import {
  Badge,
  Button,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface ISendMessage {
  message_text: string;
}

const SendOfferMessageForm = (props: { offer_id: string }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [messageSend, setMessageSend] = useState(false);
  const onSubmit = (data: ISendMessage) => {
    axios({
      method: "post",
      url: "contact.php",
      data: {
        offerId: parseInt(props.offer_id),
        msgContent: data.message_text,
        action: "sendMsgToOffer",
      },
      withCredentials: true,
    }).then((response) => {
      console.log(response);
      if (response.data.response == "notLogged")
        setError("Nie jesteś zalogowany");
      if (response.data.response == "messagesEmpty")
        setError("Wiadomość nie może być pusta");
      else setMessageSend(true);
    });
  };

  return (
    <>
      <Form className={"border p-3"} onSubmit={handleSubmit(onSubmit)}>
        <h3>
          <p>Formularz kontaktowy</p>
          <small className="text-muted">Skontaktuj się z ogłoszeniodawcą</small>
        </h3>
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
          {error !== "" ? (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          ) : (
            ""
          )}
          {messageSend == true ? (
            <div className="alert alert-success mt-2" role="alert">
              Wysłano wiadomość
            </div>
          ) : (
            ""
          )}
        </FormGroup>
      </Form>
    </>
  );
};

export default SendOfferMessageForm;
