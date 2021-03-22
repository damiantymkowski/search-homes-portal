import React, { useEffect, useState } from "react";
import axios from "axios";

interface initialValues {
  email: string;
  password: string;
  repeatPassword: string;
}

const useForm = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isFirst, setIsFirst] = useState(true);
  const [currentElement, setCurrentElement] = useState("");
  const [registerInfo, setRegisterInfo] = useState("");

  const validate = (inputs: initialValues, element: string) => {
    const Errors = {
      email: errors.email,
      password: errors.password,
      repeatPassword: errors.repeatPassword,
    };
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (
      (!regexEmail.test(inputs.email.toLowerCase()) && element === "email") ||
      (element == "Submit" && !regexEmail.test(inputs.email.toLowerCase()))
    )
      Errors.email = "Nieprawidłowy adres email";
    else if (!regexEmail.test(inputs.email.toLowerCase()) && element != "email")
      Errors.email = errors.email;
    else Errors.email = "";

    if (
      (!regexPassword.test(inputs.password) && element === "password") ||
      (element == "Submit" && !regexPassword.test(inputs.password))
    ) {
      Errors.password =
        "Hasło musi zawierać minimum 8 znaków, jedną dużą i małą literę i jedną cyfrę";
    } else if (
      !regexEmail.test(inputs.password.toLowerCase()) &&
      element != "password"
    )
      Errors.password = errors.password;
    else Errors.password = "";

    if (inputs.repeatPassword !== inputs.password)
      Errors.repeatPassword = "Hasła nie są takie same!";
    else Errors.repeatPassword = "";

    setErrors(Errors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    validate(inputs, "Submit");
    axios({
      method: "post",
      url: "http://localhost/nowydom_server/registrationLogging.php",
      data: {
        email: inputs.email,
        password: inputs.password,
        action: "registration",
      },
    }).then((response) => {
      setRegisterInfo(response.status.toString());
      console.log(response);
    });
    e ? e.preventDefault() : console.log(inputs);
  };

  useEffect(() => {
    if (!isFirst) validate(inputs, currentElement);
  }, [inputs]);

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
    inputs,
    errors,
    registerInfo,
  };
};

export default useForm;
