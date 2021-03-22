import RegisterForm from "../../components/RegisterForm/RegisterForm";
import * as Styled from "./style.styles";

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
