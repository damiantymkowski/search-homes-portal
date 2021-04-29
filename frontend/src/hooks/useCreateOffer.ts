import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface initialValues {
  title: string;
  category: string;
  description: string;
  rooms: string;
  type_build: string;
  area: string;
  rent: string;
  price: string;
  localization: string;
  phone_number: string;
  photos: [];
}

const useCreateOffer = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [currentElement, setCurrentElement] = useState("");
  const [loginInfo, setLoginInfo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let myArray = {
      Typ: "100",
      Powierzchnia: "200",
      Lokalizacja: "300",
      "Kod pocztowy": "48-320",
    };
    axios({
      method: "post",
      url: "postEditor.php",
      data: {
        params: myArray,
        title: "cos",
        description: "cos",
        photos: ["", ""],
        action: "savePostNew",
      },
      withCredentials: true,
    }).then((response) => {
      console.log(response);
    });
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
export default useCreateOffer;
