import React from "react";
import styled from "styled-components";
import { usePlatformNameData } from "hooks/common/usePlatformNameData";
import HorizontalLine from "components/common/utils/HorizontalLine";
import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import ShereMessageForm from "components/taste-match/result-page/ShereMessageForm";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";

const Message = styled.div`
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.semiLarge};
  font-weight: bold;
`;

const ResultNotLoadedPage = ({ participant = {} }) => {
  const { platformName } = usePlatformNameData();

  return (
    <BaseContainer>
      <LikesContents
        title="내가 좋아하는 음식"
        answer={participant.myChoices?.join(", ")}
      />

      <Message>"오늘은 한식이 끌리는 날이군요 :D"</Message>
      <HorizontalLine />

      <ShereMessageForm />
      <HorizontalLine />

      <ResultIconGroup platformName={platformName} />
      <ResultBottomButtonGroup />
    </BaseContainer>
  );
};

export default ResultNotLoadedPage;
