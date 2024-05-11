import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/common/utils/Button";
import Image from "components/common/utils/Image";
import Input from "components/common/utils/Input";
import { useNavigate } from "react-router-dom";

import { createRoomAndParticipant } from "apis/queries/rooms";
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 0;
  width: 100%;
`;

const StartPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const handleInputChange = (event) => {
    setNickname(event.target.value);
  };

  const handleStartClick = async () => {
    if (!nickname.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    const { room, participant, error } = await createRoomAndParticipant(
      nickname
    );

    if (!error) {
      const roomId = room.id;
      const participantId = participant.id;
      navigate(`/taste-match/rooms/${roomId}?participantId=${participantId}`);
    }
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
            width="80%"
            value={nickname}
            onChange={handleInputChange}
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
