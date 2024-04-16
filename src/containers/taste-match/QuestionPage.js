import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: larger;
  font-weight: bolder;
  flex: 1; // 남은 공간을 모두 채움
  width: 100%;
`;

const QuestionPage = () => {
  return <Container>QuestionPage</Container>;
};

export default QuestionPage;
