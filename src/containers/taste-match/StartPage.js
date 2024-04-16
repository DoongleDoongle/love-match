import React from "react";
import styled from "styled-components";
import Button from "components/common/utils/Button";
import Image from "components/common/utils/Image";
import Input from "components/common/utils/Input";
import { useNavigate } from "react-router-dom";

import tasteMatchImage from "assets/taste-match/main.jpeg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  width: 100%;
`;

const InputList = styled.div`
  padding: 10% 0;
`;

const StartPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/taste-match/questions");
  };

  return (
    <Container>
      <Image src={tasteMatchImage} alt="Taste Match" />
      <InputContainer>
        <InputList>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력해주세요."
          />
          <Input
            type="text"
            id="name2"
            name="name2"
            placeholder="테스트 제한 인원을 입력해주세요."
          />
        </InputList>
        <Button width="30%" onClick={handleStartClick}>
          시작
        </Button>
      </InputContainer>
    </Container>
  );
};

export default StartPage;
