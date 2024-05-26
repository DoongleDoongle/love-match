import React from "react";
import styled from "styled-components";
import { usePlatformNameData } from "hooks/common/usePlatformNameData";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import ShereMessageForm from "components/taste-match/result-page/ShereMessageForm";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex: 1;
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.header.height})`};
  background-color: ${({ theme, backgroundcolor }) => theme.colors.background};
`;

const TopContentsWrapper = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const LikesContentsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ShareMessageFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const BottomContentsWrapper = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 20px;
  width: 100%;
  padding: 30px 0 30px 0;
`;

const Message = styled.div`
  margin: 20px 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.semiLarge};
  font-weight: bold;
`;

const ResultNotLoadedPage = ({ participant = {} }) => {
  const { platformName } = usePlatformNameData();

  return (
    <Container>
      <TopContentsWrapper>
        <LikesContentsWrapper>
          <LikesContents
            title="내가 좋아하는 음식"
            answer={participant.myChoices?.join(", ")}
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
