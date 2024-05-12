import styled from "styled-components";
import CustomButton from "components/common/utils/CustomButton";

const ShereMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ShereMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const ShereBottomMessage = styled.div`
  margin-top: 2px;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.primary};
`;

const ShereMessageForm = () => {
  return (
    <ShereMessageContainer>
      <ShereMessage>
        <p>아직 함께한 친구가 없군요.</p>
        친구에게 게임을 공유해주세요.
      </ShereMessage>

      <CustomButton width="50%">친구에게 공유하기</CustomButton>

      <ShereBottomMessage>
        친구가 참여하면 궁합 정보를 볼 수 있어요
      </ShereBottomMessage>
    </ShereMessageContainer>
  );
};

export default ShereMessageForm;
