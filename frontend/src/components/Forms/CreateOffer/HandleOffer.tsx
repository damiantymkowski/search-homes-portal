import React, { RefObject, useEffect, useRef, useState } from "react";
import * as Styled from "./style.styles";
import AddImage from "./AddImage/AddImage";
import useCreateOffer from "../../../hooks/useCreateOffer";
import axios from "axios";
import { Spinner } from "react-bootstrap";

interface IProps {
  action: string;
  postId?: string;
}
const HandleOffer = (props: IProps) => {
  const {
    handleInputChange,
    handleSubmit,
    setItems,
    loginInfo,
    loading,
  } = useCreateOffer(
    {
      title: "",
      category: "",
      description: "",
      rooms_number: "",
      type_build: "",
      area: "",
      rent: "",
      price: "",
      localization: "",
      phone_number: "",
      photos: [],
    },
    { action: props.action }
  );
  const custom = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (custom.current) console.log(custom.current.id);
  }, []);

  return (
    <>
      <Styled.Title>Dodaj ogłoszenie</Styled.Title>
      <Styled.Form onSubmit={handleSubmit}>
        <Styled.Box>
          <Styled.BoxTitle>Im więcej szczegółów, tym lepiej!</Styled.BoxTitle>
          <Styled.Wrapper>
            <Styled.Label htmlFor="title">Tytuł ogłoszenia*</Styled.Label>
            <Styled.InputWrapper>
              <Styled.Input
                name="title"
                onChange={handleInputChange}
                placeholder="np. Dom na spokojnej wsi"
                data-tip
                data-for="titleTip"
              />
              <Styled.StyledTooltip
                multiline={true}
                id="titleTip"
                place="right"
                effect="solid"
                type="info"
              >
                Pomyśl o jasnym i chwytliwym tytule, który przyciągnie
                kupujących.
                {"\n"}
                Nie wstawiaj numerów telefonu, adresów e-mail i linków. {"\n"}No
                i prosimy - nie pisz WIELKIMI LITERAMI.
              </Styled.StyledTooltip>
            </Styled.InputWrapper>
          </Styled.Wrapper>

          <Styled.Wrapper>
            <Styled.Label htmlFor="title">Kategoria*</Styled.Label>
            <Styled.InputWrapper>
              <Styled.Select name="title">
                <Styled.Option value="" disabled selected>
                  Wybierz kategorię
                </Styled.Option>
                <Styled.Option value="flat">Mieszkanie</Styled.Option>
                <Styled.Option value="house">Dom</Styled.Option>
              </Styled.Select>
            </Styled.InputWrapper>
          </Styled.Wrapper>
        </Styled.Box>

        <Styled.Box>
          <Styled.BoxTitle>Zdjęcia</Styled.BoxTitle>
          <Styled.SmallText>
            Pierwsze zdjęcie będzie zdjęciem głównym. Przeciągaj zdjęcia na inne
            miejsca, aby zmienić ich kolejność.
          </Styled.SmallText>

          <AddImage
            ref={custom}
            setItems={setItems}
            handler={handleInputChange}
          />
        </Styled.Box>

        <Styled.Box>
          <Styled.BoxTitle>Opis</Styled.BoxTitle>
          <Styled.SmallText>
            Wpisz te informacje, które byłyby ważne dla Ciebie podczas
            przeglądania takiego ogłoszenia
          </Styled.SmallText>
          <Styled.DescriptionInput
            onChange={handleInputChange}
            name="description"
            data-tip
            data-for="description"
          />
          <Styled.StyledTooltip
            multiline={true}
            id="description"
            place="right"
            effect="solid"
            type="info"
          >
            Pisz jasno. Unikniesz powtarzających się pytań od kupujących, dla
            których coś okaże się niezrozumiałe.
            {"\n"}
            Dodaj sporo szczegółów. Bądź szczery. Spełnisz oczekiwania
            kupującego {"\n"}i otrzymasz pozytywną ocenę
          </Styled.StyledTooltip>
        </Styled.Box>
        <Styled.Box>
          <Styled.BoxTitle>Szczegóły</Styled.BoxTitle>
          <Styled.Label htmlFor="rooms_number">Liczba pokoi</Styled.Label>
          <Styled.InputWrapper>
            <Styled.Input
              onChange={handleInputChange}
              name="rooms_number"
              placeholder="Ile znajduje się pokoi w tej nieruchomości?"
            />
          </Styled.InputWrapper>
          <Styled.Label htmlFor="type_build">Rodzaj zabudowy</Styled.Label>
          <Styled.InputWrapper>
            <Styled.Input
              onChange={handleInputChange}
              name="type_build"
              placeholder="Określ typ zabudowy"
            />
          </Styled.InputWrapper>
          <Styled.Label htmlFor="area">Powierzchnia</Styled.Label>
          <Styled.InputWrapper>
            <Styled.Input
              onChange={handleInputChange}
              name="area"
              placeholder="m²"
            />
          </Styled.InputWrapper>
          <Styled.Label htmlFor="rent">Czynsz (dodatkowo)*</Styled.Label>
          <Styled.InputWrapper>
            <Styled.Input
              onChange={handleInputChange}
              name="rent"
              placeholder="Ile wynosi czynsz?"
            />
          </Styled.InputWrapper>
          <Styled.Label htmlFor="price">Cena</Styled.Label>
          <Styled.InputWrapper>
            <Styled.Input
              onChange={handleInputChange}
              name="price"
              placeholder="Cena"
            />
          </Styled.InputWrapper>
        </Styled.Box>

        <Styled.Box>
          <Styled.BoxTitle>Dane kontaktowe</Styled.BoxTitle>
          <Styled.Label htmlFor="localization">Lokalizacja</Styled.Label>
          <Styled.InputWrapper>
            <Styled.Input
              onChange={handleInputChange}
              name="localization"
              placeholder="Wybierz z listy"
            />
          </Styled.InputWrapper>

          <Styled.Label htmlFor="phone_number">Numer telefonu</Styled.Label>
          <Styled.InputWrapper>
            <Styled.Input
              onChange={handleInputChange}
              name="phone_number"
              placeholder="+48 Twój numer telefonu"
            />
          </Styled.InputWrapper>
        </Styled.Box>
        <Styled.SaveButton>Zapisz ogłoszenie</Styled.SaveButton>
      </Styled.Form>
      {loading ? <Spinner animation="border" role="status" /> : loginInfo}
    </>
  );
};

export default HandleOffer;
