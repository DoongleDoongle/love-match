import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.header.height})`};
`;

function CustomSpinner() {
  return (
    <SpinnerWrapper>
      <Spinner animation="grow" />
    </SpinnerWrapper>
  );
}

export default CustomSpinner;
