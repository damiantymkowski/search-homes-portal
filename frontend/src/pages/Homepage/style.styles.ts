import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Section = styled.div`
  background-color: #333840;
  height: 200px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

interface TextProps {
  small: boolean;
}

export const SectionText = styled.span<TextProps>`
  font-size: ${(props) => (props.small ? "1.4em" : "1.9em")};
  font-weight: ${(props) => (props.small ? "200" : "600")};
  word-break: break-all;
  color: #fff;
`;
