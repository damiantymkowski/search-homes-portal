import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface initialValues {
  name: string;
  number: string;
}

const useChangeUserDetails = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [changeInfo, setChangeInfo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e ? e.preventDefault() : console.log(inputs);
    axios({
      method: "post",
      url: "userPanel.php",
      data: {
        newName: inputs.name,
        newPhone: inputs.number,
        action: "changeContactData",
      },
      withCredentials: true,
    }).then((response) => {
      if (response.data.response === "badData")
        setChangeInfo("Wprowadzono błędne dane");
      else if (response.data.response === "notLogged")
        Cookies.remove("PHPSESSID");
      else if (response.data.response === "contactDataChanged")
        setChangeInfo("Poprawnie zmieniono dane kontaktowe!");
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    changeInfo,
  };
};

export default useChangeUserDetails;
