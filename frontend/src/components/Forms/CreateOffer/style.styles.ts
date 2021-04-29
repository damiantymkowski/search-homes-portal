import styled from "styled-components";
import { Colors } from "../../../shared/Colors/style.styles";
import ReactTooltip from "react-tooltip";

export const Box = styled.div`
  background-color: ${Colors.white};
  box-shadow: 5px 5px 20px 12px rgb(0 0 0 / 3%);
  width: 70%;
  min-height: 300px;
  padding: 15px;
  margin-top: 5px;
  border: 1px solid #ececec;
`;

export const Title = styled.h2`
  font-size: 1.9em;
  color: ${Colors.caramine_pink};
  line-height: 34px;
  font-weight: 200;
  margin-right: auto;
  margin-left: 10%;
`;

export const BoxTitle = styled.h4`
  font-size: 1.3em;
  color: ${Colors.deep_cove};
  line-height: 34px;
  font-weight: 200;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

export const InputWrapper = styled.div``;

export const Label = styled.label`
  margin: 0px;
  padding: 0px 0px 8px;
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 18px;
  margin-top: 5px;
  color: ${Colors.deep_cove};
`;

export const Input = styled.input`
  height: 40px;
  border: none;
  padding: 5px;
  background-color: ${Colors.deepWhite};
  width: 55%;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 16px;
  }
  :focus {
    outline: none;
    border-bottom: 1px solid ${Colors.deep_cove};
  }
`;

export const Select = styled.select`
  height: 50px;
  width: 30%;
  border: none;
  background-color: ${Colors.deepWhite};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 15px;
  cursor: pointer;
  color: gray;
  background-image: url("data:image/png;base64,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");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 15px;
  font-size: 16px;
  :focus {
    outline: none;
    border-bottom: 1px solid ${Colors.deep_cove};
  }
`;

export const StyledTooltip = styled(ReactTooltip)`
  max-width: 55vh;
  font-size: 12px !important;
  background: red;
  white-space: pre-wrap;
`;

export const SmallText = styled.p`
  font-size: 12px;
  color: gray;
  margin-top: -25px;
`;

export const DescriptionInput = styled.input`
  height: 250px;
  width: 50%;
  background-color: ${Colors.deepWhite};
  border: none;
  border-radius: 2px;
`;

export const SaveButton = styled.button`
  border: none;
  background: ${Colors.pure_apple};
  color: #ffff;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  width: 15%;
  font-size: 17px;
`;

export const Option = styled.option``;
