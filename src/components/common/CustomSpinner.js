import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
`;

function CustomSpinner() {
  return (
    <SpinnerWrapper>
      <Spinner animation="grow" />
    </SpinnerWrapper>
  );
}

export default CustomSpinner;
