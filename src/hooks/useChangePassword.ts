import React, { useEffect, useState } from "react";
import axios from "axios";

interface initialValues {
  currentPassword: string;
  newPassword: string;
  repeatPassword: string;
}

const useChangePassword = (initialValues: initialValues) => {
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
      currentPassword: errors.currentPassword,
      newPassword: errors.newPassword,
      repeatPassword: errors.repeatPassword,
    };

    if (inputs.newPassword !== inputs.repeatPassword)
      Errors.repeatPassword = "Hasła nie są identyczne!";
    else Errors.repeatPassword = "";

    setErrors(Errors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e ? e.preventDefault() : console.log(inputs);
    axios({
      method: "post",
      url: "userPanel.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        actualPassword: inputs.currentPassword,
        newPassword: inputs.newPassword,
        action: "changePassword",
      },
      withCredentials: true,
    }).then((response) => {
      setChangeInfo("Pomyślnie zmieniono hasło!");
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

export default useChangePassword;
