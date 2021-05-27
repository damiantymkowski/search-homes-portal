import styled from "styled-components";
import { Colors } from "../../shared/Colors/style.styles";

export const Title = styled.h3`
  color: #000;
  font-weight: 400;
  font-size: 1.6em;
`;

export const Report = styled.h4`
  color: ${Colors.caramine_pink};
  margin-top: 15px;
`;

export const FormContainer = styled.div`
  margin-top: 60px;
  flex-basis: 60%;
`;
export const OfferContainer = styled.div`
  flex-basis: 70%;
`;

export const Container = styled.div`
  width: 85%;
  font-family: "Lato", sans-serif;
  display: flex;
`;

export const MainImage = styled.img`
  width: 70%;
`;

export const Box = styled.div`
  display: flex;
`;

export const Details = styled.div``;

export const DetatilsTitle = styled.h3`
  font-weight: 300;
  color: ${Colors.pure_apple};
`;

export const Price = styled.h3`
  font-size: 22px;
  color: ${Colors.caramine_pink};
  font-weight: 400;
`;

export const Field = styled.p`
  margin-top: -10px;
  padding: 2px;
`;

export const Name = styled.span`
  color: ${Colors.deep_cove};
  margin-right: 5px;
`;

export const Value = styled.span`
  font-weight: 300;
`;

export const Description = styled.div`
  width: 50%;
  line-height: 1.8rem;
  font-weight: 400;
  color: #4e4e4e;
`;
