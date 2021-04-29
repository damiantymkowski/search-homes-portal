import styled from "styled-components";
import { Colors } from "../../../../shared/Colors/style.styles";

export const UploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const PhotosContainer = styled.div`
  :first-child {
    :after {
      position: absolute;
      content: "Zdjęcie główne";
      margin-top: -25px;
      margin-left: 25px;
    }
  }
`;

export const UploadBox = styled.label`
  cursor: pointer;
  background: #e2e2e2;
  width: 150px;
  justify-content: center;
  align-items: center;
  height: 150px;
  display: flex;
  margin-left: 5px;
  border-radius: 15px;

  svg {
    color: #4e4e4e;
  }
`;

export const UploadPhoto = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
`;
