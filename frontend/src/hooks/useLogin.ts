import React, { useEffect, useState } from "react";
import axios from "axios";
import {AuthContext} from "../App";
import {initial, RegisterReducer} from "../shared/Reducers/RegisterReducer";

interface initialValues {
  email: string;
  password: string;
}

const useLogin = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [currentElement, setCurrentElement] = useState("");
  const [loginInfo, setLoginInfo] = useState("");
  const {dispatch} = React.useContext(AuthContext);

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
      if (response.data.response == "wrongPassword")
        setLoginInfo("Błędne hasło!");
      if (response.data.response === "successLogin") {
        dispatch({
          type:"LOGIN",
          payload: response.data.response
        })
        setLoginInfo("Pomyślnie zalogowano!");
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
