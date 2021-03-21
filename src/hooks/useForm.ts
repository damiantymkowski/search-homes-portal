import React, { useEffect, useState } from "react";

interface initialValues {
  email: string;
  password: string;
}

const useForm = (initialValues: initialValues) => {
  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [isFirst, setIsFirst] = useState(true);

  const validate = (inputs: initialValues) => {
    const errors = {
      email: "",
      password: "",
    };
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(inputs.email.toLowerCase())) errors.email = "Invalid email";
    if (inputs.email.length == 0) errors.email = "Email is empty";

    setErrors(errors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    validate(inputs);
    e ? e.preventDefault() : console.log(inputs);
  };

  useEffect(() => {
    if (!isFirst) validate(inputs);
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputs((inputs) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));
    setIsFirst(false);
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
  };
};

export default useForm;
