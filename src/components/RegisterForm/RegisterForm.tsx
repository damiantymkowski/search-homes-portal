import React from "react";
import * as Styled from "./style.styles";
import useForm from "../../hooks/useForm";

const RegisterForm = () => {
  const {
    inputs,
    handleInputChange,
    handleSubmit,
    errors,
    registerInfo,
  } = useForm({
    email: "",
    password: "",
    repeatPassword: "",
  });
  return (
    <>
      <Styled.Box>
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.InputContainer>
            <Styled.InputText>Email</Styled.InputText>
            <Styled.Input
              required
              name="email"
              type="email"
              onChange={handleInputChange}
            />
          </Styled.InputContainer>
          <Styled.ErrorText>{errors.email}</Styled.ErrorText>
          <Styled.InputContainer>
            <Styled.InputText>Hasło</Styled.InputText>
            <Styled.Input
              required
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </Styled.InputContainer>
          <Styled.ErrorText>{errors.password}</Styled.ErrorText>
          <Styled.InputContainer>
            <Styled.InputText>Powtórz hasło</Styled.InputText>
            <Styled.Input
              required
              name="repeatPassword"
              type="password"
              onChange={handleInputChange}
            ></Styled.Input>
          </Styled.InputContainer>
          <Styled.ErrorText>{errors.repeatPassword}</Styled.ErrorText>
          <Styled.PolicyText>
            Klikając przycisk Zarejestruj się, akceptuję Regulamin.
          </Styled.PolicyText>
          <Styled.PolicyText>
            Przyjmuję do wiadomości, że Grupa nowyDom.pl wykorzystuje moje dane
            osobowe zgodnie z Polityką prywatności oraz Polityką dotyczącą
            plików cookie i podobnych technologii. Grupa nowyDom.pl wykorzystuje
            zautomatyzowane systemy i partnerów do analizowania, w jaki sposób
            korzystam z usług w celu zapewnienia odpowiedniej funkcjonalności
            produktu, treści, dostosowanych i opartych na zainteresowaniach
            reklam, jak również ochrony przed spamem, złośliwym oprogramowaniem
            i nieuprawnionym korzystaniem z naszych usług.
          </Styled.PolicyText>
          <Styled.PolicyContainer>
            <Styled.PolicyCheckbox
              required
              type={"checkbox"}
            ></Styled.PolicyCheckbox>
            <Styled.PolicyText>
              Wyrażam zgodę na używanie przez Grupę nowyDom.pl sp. z o.o.
              środków komunikacji elektronicznej oraz telekomunikacyjnych
              urządzeń końcowych w celu przesyłania mi informacji handlowych
              oraz prowadzenia marketingu (np. newsletter, wiadomości SMS) przez
              nowyDom.pl sp. z o.o., podmioty powiązane i partnerów biznesowych.
            </Styled.PolicyText>
          </Styled.PolicyContainer>

          <Styled.RegisterButton type="submit">
            Zarejestruj się
          </Styled.RegisterButton>
          <Styled.InfoText>{registerInfo}</Styled.InfoText>
        </Styled.Form>
      </Styled.Box>
    </>
  );
};

export default RegisterForm;
