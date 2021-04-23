import React from "react";
import * as Styled from "./style.styles"

const Advertisement = () => {
    return (
        <>
<Styled.Container>
            <Styled.Title>Cichy, luksusowy apartament</Styled.Title>
    <Styled.Localization>Warszawa, Śródmieście ul. Ciasna</Styled.Localization>

<Styled.Box>
    <Styled.MainImage src="https://www.homekoncept.com.pl/wp-content/uploads/2020/08/HomeKONCEPT-79-zdjecie-1.jpg"></Styled.MainImage>

</Styled.Box>
<Styled.Details>
    <Styled.DetatilsTitle>Szczegóły ogłoszenia</Styled.DetatilsTitle>
    <Styled.DetatilsTitle>Opis</Styled.DetatilsTitle>
    <Styled.DetatilsTitle>Mapa</Styled.DetatilsTitle>
</Styled.Details>
</Styled.Container>

        </>
    );
};

export default Advertisement;
