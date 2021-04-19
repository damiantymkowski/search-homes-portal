import * as Styled from "./style.styles";

const Search = () => {
  return (
    <>
      <Styled.Box>
        <Styled.SearchTag>Wyszukiwarka</Styled.SearchTag>
        <Styled.SearchForm>
          <Styled.SearchInput>
            <option value="">Mieszkanie</option>
          </Styled.SearchInput>
          <Styled.SearchInput>
            <option value="">na sprzedaż</option>
          </Styled.SearchInput>
          <Styled.SearchCity placeholder={"Miejscowość"}></Styled.SearchCity>
          <Styled.SearchButton>Wyszukaj</Styled.SearchButton>
        </Styled.SearchForm>
      </Styled.Box>
    </>
  );
};

export default Search;
