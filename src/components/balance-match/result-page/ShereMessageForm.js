import styled from "styled-components";
import CustomButton from "components/common/utils/CustomButton";
import { useShareUrl } from "hooks/common/useShareUrl";
import { incrementInviteCount } from "apis/queries";
import { translatePlatformNameToKorean } from "utils/functions/common";

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
  font-size: 14px;
  margin: 20px 0;
`;

const OneLineMessage = styled.div`
  margin: 0;
  padding: 0;
`;

const ShereBottomMessage = styled.div`
  margin-top: 2px;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const ShereMessageForm = ({ platformName, setInviteCount }) => {
  const { createInviteUrl } = useShareUrl();

  const inviteHandler = async () => {
    const { platform, error } = await incrementInviteCount(platformName);
    if (!error && platform !== null) {
      setInviteCount(platform.invite_count);
      createInviteUrl({
        title: `${translatePlatformNameToKorean(platformName)} - 러브매치`,
        imageUrl: `/games/balance-match/${platformName}/index.png
        `,
      });
    }
  };

  return (
    <ShereMessageContainer>
      <ShereMessage>
        <OneLineMessage>아직 함께한 친구가 없군요.</OneLineMessage>
        <OneLineMessage>친구에게 게임을 공유해주세요.</OneLineMessage>
      </ShereMessage>

      <CustomButton width="50%" onClick={inviteHandler}>
        친구 초대
      </CustomButton>

      <ShereBottomMessage>
        친구가 참여하면 서로의 궁합 정보를 볼 수 있어요
      </ShereBottomMessage>
    </ShereMessageContainer>
  );
};

export default ShereMessageForm;
