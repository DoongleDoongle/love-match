import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usePlatformNameData } from "hooks/common/usePlatformNameData";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import ShereMessageForm from "components/taste-match/result-page/ShereMessageForm";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";
import { fetchChoicesByPlatformName } from "apis/queries";
import { getResultChoices } from "utils/functions/taste-match/results";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.header.height})`};
  background-color: ${({ theme, backgroundcolor }) => theme.colors.background};
`;

const TopContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ShareMessageFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const BottomContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ResultNotLoadedPage = ({ choiceTopic = "음식", participant = {} }) => {
  const { platformName } = usePlatformNameData();
  const [allChoices, setAllChoices] = useState([]);

  useEffect(() => {
    const fetchChoices = async () => {
      if (participant && Object.keys(participant).length > 0 && platformName) {
        const { choices, error } = await fetchChoicesByPlatformName(
          platformName
        );
        if (!error) {
          setAllChoices(
            choices.map(({ id, platform_id, group_id, choice, image_url }) => {
              return {
                id,
                choice,
                platformId: platform_id,
                groupId: group_id,
                imageUrl: image_url,
              };
            })
          );
        }
      }
    };

    fetchChoices();
  }, [participant, platformName]);

  return (
    <Container>
      <TopContentsWrapper>
        <LikesContents
          title={`내가 좋아하는 ${choiceTopic}`}
          description={`선택한 ${choiceTopic}들을 확인해보세요!`}
          choices={getResultChoices(
            participant.myChoiceIds,
            allChoices,
            participant.myChoiceIds
          )}
        />
        {/* <Message>"오늘은 한식이 끌리는 날이군요 :D"</Message> */}

        <ShareMessageFormWrapper>
          <ShereMessageForm />
        </ShareMessageFormWrapper>
      </TopContentsWrapper>

      <BottomContentsWrapper>
        <ResultIconGroup platformName={platformName} />
        <ResultBottomButtonGroup />
      </BottomContentsWrapper>
    </Container>
  );
};

export default ResultNotLoadedPage;
