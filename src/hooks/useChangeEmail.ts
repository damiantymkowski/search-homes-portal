import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

interface initialValues {
  userPassword: string;
  newEmail: string;
}

const useChangeEmail = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [changeInfo, setChangeInfo] = useState("");
  const [currentElement, setCurrentElement] = useState("");
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (!isFirst) validate(inputs, currentElement);
  }, [inputs]);

  const validate = (inputs: initialValues, element: string) => {
    const Errors = {
      userPassword: errors.userPassword,
      newEmail: errors.newEmail,
    };
    setErrors(Errors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e ? e.preventDefault() : console.log(inputs);
    axios({
      method: "post",
      url: "userPanel.php",
      data: {
        actualPassword: inputs.userPassword,
        newEmail: inputs.newEmail,
        action: "changeEmail",
      },
      withCredentials: true,
    }).then((response) => {
      if (response.data.response === "badData")
        setChangeInfo("Wprowadź poprawną formę adresu e-mail");
      else if (response.data.response === "wrongPassword")
        setChangeInfo("Wprowadzono nieprawidłowe hasło do konta");
      else if (response.data.response === "notLogged")
        Cookies.remove("PHPSESSID");
      else if (response.data.response === "emailChanged")
        setChangeInfo("Poprawnie zmieniono email!");
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
    setIsFirst(false);
    setCurrentElement(e.target.name);
  };

  return {
    handleSubmit,
    handleInputChange,
    changeInfo,
    errors,
  };
};

export default useChangeEmail;
