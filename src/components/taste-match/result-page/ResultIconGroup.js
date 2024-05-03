import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faThumbsUp,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import theme from "styles/theme";

const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: 20px 0;
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 10px;
  transition: transform 0.1s ease-in-out;

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }
`;

const IconLabel = styled.span`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.fontSizes.semiSmall};
`;

const ResultIconGroup = () => {
  const IconSize = "2x";
  const IconColor = theme.colors.primary;

  return (
    <IconButtonWrapper>
      <IconButton onClick={() => console.log("Capture")}>
        <FontAwesomeIcon icon={faCamera} size={IconSize} color={IconColor} />
        <IconLabel>캡쳐하기</IconLabel>
      </IconButton>
      <IconButton onClick={() => console.log("Like")}>
        <FontAwesomeIcon icon={faThumbsUp} size={IconSize} color={IconColor} />
        <IconLabel>좋아요</IconLabel>
      </IconButton>
      <IconButton onClick={() => console.log("Share")}>
        <FontAwesomeIcon
          icon={faShareSquare}
          size={IconSize}
          color={IconColor}
        />
        <IconLabel>공유하기</IconLabel>
      </IconButton>
    </IconButtonWrapper>
  );
};

export default ResultIconGroup;
