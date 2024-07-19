import React, { useState } from "react";
import styled from "styled-components";
import CustomButton from "components/common/utils/CustomButton";
import Input from "components/common/utils/Input";
import CustomModal from "components/common/utils/CustomModal";
import CustomHelmet from "components/common/Helmet";
import { useNavigate } from "react-router-dom";

import { createRoomAndParticipant } from "apis/queries/rooms";
import { calculateMainLayoutHeight } from "styles/functions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
`;

const PlatformInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Single Day";
  width: 100%;
  height: ${({ theme }) => `calc(${calculateMainLayoutHeight(theme)} - 30%)`};
`;

const PlatformTitle = styled.div`
  font-size: ${({ platformTitleSize }) => platformTitleSize};
  color: ${({ theme }) => theme.colors.secondary};
`;

const PlatformDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StartPage = ({
  platformTitle = "플랫폼 타이틀",
  platformTitleSize = "40px",
  platformDescription = "테스트 후, 친구를 초대해 궁합을 확인하세요!",
}) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleInputChange = (event) => {
    setNickname(event.target.value);
  };

  const handleStartClick = async () => {
    if (!nickname.trim()) {
      setModalShow(true);
      return;
    }

    const { room, participant, error } = await createRoomAndParticipant(
      nickname
    );

    if (!error) {
      const roomId = room.id;
      const participantId = participant.id;
      const newUrl = `${window.location.pathname}/rooms/${roomId}?participantId=${participantId}`;
      navigate(newUrl);
    }
  };

  return (
    <Container>
      <CustomHelmet
        title={`러브매치 - ${platformTitle}`}
        description={`커플/친구와 함께 맞춰보는 ${platformTitle}!`}
      />

      <CustomModal
        description="이름을 입력해주세요."
        onClose={() => setModalShow(false)}
        show={modalShow}
      />

      <PlatformInfoWrapper>
        <PlatformTitle platformTitleSize={platformTitleSize}>
          {platformTitle}
        </PlatformTitle>

        <PlatformDescription>
          {platformDescription.split("\\n").map((el, index) => (
            <div key={index}>{el}</div>
          ))}
        </PlatformDescription>
      </PlatformInfoWrapper>

      {/* <Image src={tasteMatchImage} alt="Taste Match" /> */}

      <InputContainer>
        <InputList>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력해주세요."
            width="80%"
            height="50px"
            value={nickname}
            onChange={handleInputChange}
          />
        </InputList>
        <CustomButton
          width="80%"
          height="50px"
          margin="10px 0 0 0"
          onClick={handleStartClick}
        >
          시작
        </CustomButton>
      </InputContainer>
    </Container>
  );
};

export default StartPage;
