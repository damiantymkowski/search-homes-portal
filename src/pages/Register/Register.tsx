import RegisterForm from "../../components/RegisterForm/RegisterForm";
import * as Styled from "./style.styles";
import Header from "../../components/Header/Header";

const Register = () => {
  return (
    <>
      <Header />
      <Styled.Container>
        <Styled.HeaderRegister>
          <Styled.HeaderText>Zarejestruj się</Styled.HeaderText>
        </Styled.HeaderRegister>
        <RegisterForm />
      </Styled.Container>
    </>
  );
};

export default Register;
