import * as Styled from "./style.styles";
import { useHistory } from "react-router-dom";
import React, { FormEvent, useRef } from "react";

const Search = () => {
  const history = useHistory();
  let price = useRef<HTMLInputElement>();
  let city = useRef<HTMLInputElement>();
  const redirect = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      price.current?.value !== "" &&
      city.current?.value !== "" &&
      price.current?.value !== undefined &&
      city.current?.value !== undefined
    ) {
      history.push({
        pathname: "/wyszukiwarka",
        search: "?price=" + price.current.value + "?city=" + city.current.value,
      });
    } else if (
      price.current?.value !== "" &&
      city.current?.value == "" &&
      price.current?.value !== undefined &&
      city.current?.value !== undefined
    ) {
      history.push({
        pathname: "/wyszukiwarka",
        search: "?price=" + price.current.value,
      });
    } else if (city.current !== undefined) {
      history.push({
        pathname: "/wyszukiwarka",
        search: "?city=" + city.current.value,
      });
    }
  };
  return (
    <>
      <Styled.Box>
        <Styled.SearchTag>Wyszukiwarka</Styled.SearchTag>
        <Styled.SearchForm onSubmit={(e) => redirect(e)}>
          <Styled.SearchCity ref={price as any} placeholder={"Cena"} />

          <Styled.SearchCity ref={city as any} placeholder={"Miejscowość"} />
          <Styled.SearchButton>Wyszukaj</Styled.SearchButton>
        </Styled.SearchForm>
      </Styled.Box>
    </>
  );
};

export default Search;
