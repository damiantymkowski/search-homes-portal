import React from "react";
import Header from "../../components/Header/Header";
import * as Global from "../../shared/Global/style.styles";
import { Button, Form } from "react-bootstrap";

import Footer from "../../components/Footer/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../App";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const Admin = () => {
  const { register, handleSubmit } = useForm();
  const { dispatch } = React.useContext(AuthContext);
  const { state } = React.useContext(AuthContext);

  const onSubmit = (data: any) => {
    axios({
      method: "post",
      url: "admin.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: data.email,
        password: data.password,
        action: "loginAdmin",
      },
      withCredentials: true,
    }).then((response) => {
      if (response.data.response === "successLogin") {
        dispatch({
          type: "LOGIN",
          payload: response.data.response,
        });
        Cookies.set("admin", "true");
      }
    });
  };
  if (state.isAuthenticated === false) {
    return (
      <>
        <Header />
        <Global.Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Adres mailowy</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder="Wpisz e-mail"
              />
              <Form.Text className="text-muted">
                Nie podzielimy się tymi danymi z nikim innym.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="Hasło"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Zaloguj się do panelu
            </Button>
          </Form>
        </Global.Container>
        <Footer />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Admin;
