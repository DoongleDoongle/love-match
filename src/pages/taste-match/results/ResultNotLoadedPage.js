import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usePlatformNameData } from "hooks/common/usePlatformNameData";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import ShereMessageForm from "components/taste-match/result-page/ShereMessageForm";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";
import { fetchChoicesByPlatformName } from "apis/queries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0 20px;
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

const LikesContentsWrapper = styled.div`
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

const Message = styled.div`
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.semiLarge};
  font-weight: bold;
`;

const ResultNotLoadedPage = ({ participant = {} }) => {
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

  const getChoices = () => {
    const selectedChoices = allChoices.filter(({ id }) =>
      participant.myChoiceIds.includes(id)
    );

    const selectedChoicesGrouping = selectedChoices.reduce(
      (acc, selectedChoice) => {
        const foundChoices = allChoices.filter(
          (choice) => choice.groupId === selectedChoice.groupId
        );
        const sortedChoices = foundChoices.sort((a, b) => a.id - b.id);
        const updatedChoices = sortedChoices.map((choice) => {
          return {
            ...choice,
            isSelected: participant.myChoiceIds.includes(choice.id),
          };
        });
        return [...acc, updatedChoices];
      },
      []
    );
    return selectedChoicesGrouping;
  };

  return (
    <Container>
      <TopContentsWrapper>
        <LikesContentsWrapper>
          <LikesContents
            title="내가 좋아하는 음식"
            description="선택한 메뉴를 확인해보세요."
            choices={getChoices()}
          />
          {/* <Message>"오늘은 한식이 끌리는 날이군요 :D"</Message> */}
        </LikesContentsWrapper>

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
