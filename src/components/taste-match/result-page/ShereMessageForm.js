import styled from "styled-components";
import CustomButton from "components/common/utils/CustomButton";
import { useShareUrl } from "hooks/common/useShareUrl";

const ShereMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
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
`;

const ShereMessageForm = () => {
  const { createInviteUrl } = useShareUrl();
  return (
    <ShereMessageContainer>
      <ShereMessage>
        <p>아직 함께한 친구가 없군요.</p>
        친구에게 게임을 공유해주세요.
      </ShereMessage>

      <CustomButton width="50%" onClick={createInviteUrl}>
        친구 초대
      </CustomButton>

      <ShereBottomMessage>
        친구가 참여하면 서로의 궁합 정보를 볼 수 있어요
      </ShereBottomMessage>
    </ShereMessageContainer>
  );
};

export default ShereMessageForm;
