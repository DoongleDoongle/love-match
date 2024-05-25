import React, { useState } from "react";
import styled from "styled-components";
import CustomButton from "components/common/utils/CustomButton";
import Image from "components/common/utils/Image";
import Input from "components/common/utils/Input";
import { useNavigate } from "react-router-dom";

import { createRoomAndParticipant } from "apis/queries/rooms";
import tasteMatchImage from "assets/taste-match/main.jpeg";
// import tasteMatchImage from "assets/common/love-match-logo.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  position: relative;
`;

const CenteredImage = styled(Image)`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10%;
  /* position: absolute;
  bottom: 10%; */
`;

const InputList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
            borderRadius="14px"
            value={nickname}
            onChange={handleInputChange}
          />
        </InputList>
        <CustomButton width="30%" margin="10% 0 0 0" onClick={handleStartClick}>
          시작
        </CustomButton>
      </InputContainer>
    </Container>
  );
};

export default StartPage;
