import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

interface initialValues {
  email: string;
  password: string;
}

const useLogin = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [currentElement, setCurrentElement] = useState("");
  const [loginInfo, setLoginInfo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    axios({
      method: "post",
      url: "registrationLogging.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: inputs.email,
        password: inputs.password,
        action: "logging",
      },
      withCredentials: true,
    }).then((response) => {
      if (response.data.response == "noUser")
        setLoginInfo("Brak takiego Użytkownika!");
      if (response.data.response === "successLogin") {
        const cookies = new Cookies();
        cookies.set('logged', true, { path: '/' });
        setLoginInfo("Pomyślnie zalogowano!");
    console.log(response);
      }
    });

    e ? e.preventDefault() : console.log(inputs);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
    setCurrentElement(e.target.name);
  };

  return { handleSubmit, handleInputChange, loginInfo };
};
export default useLogin;
