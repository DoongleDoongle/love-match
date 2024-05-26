import React, { useState } from "react";
import styled from "styled-components";
import { usePlatformNameData } from "hooks/common/usePlatformNameData";

import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import Navbar from "components/taste-match/result-page/Navbar";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";

const TopContentsWrapper = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
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

const LikesContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CompatibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.light};
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0.5px 2px 0 rgb(0, 0, 0, 0.3);
`;

const CompatibilityLabel = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const CompatibilityRate = styled.div`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 800;
`;

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 40vh; // 스크롤을 적용할 최대 높이 설정
  overflow-y: scroll; // 내용이 넘칠 경우 스크롤 적용
  background-color: ${({ theme }) => theme.colors.light};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};

  /* 스크롤바 스타일링 (웹킷 브라우저 전용) */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    border: 3px solid white; // 스크롤바 주변에 여백을 줌
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid rgb(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`;

const ResultLoadedPage = ({ allParticipants, participants }) => {
  const { platformName } = usePlatformNameData();
  const [activeParticipant, setActiveParticipant] = useState(
    participants[0].nickname
  );

  const activeData = participants.find((p) => p.nickname === activeParticipant);

  return (
    <BaseContainer>
      <TopContentsWrapper>
        <LikesContentsWrapper>
          <LikesContents
            title="모두가 좋아하는 음식"
            answer={
              allParticipants.togetherLikesChoices.join(", ") ||
              "저런,, 궁합이 꽝이네.."
            }
          />

          <CompatibilityContainer>
            <CompatibilityLabel>궁합도: </CompatibilityLabel>
            <CompatibilityRate>{allParticipants.rate}</CompatibilityRate>
          </CompatibilityContainer>
        </LikesContentsWrapper>

        <NavbarWrapper>
          <Navbar
            appearance="tabs"
            active={activeParticipant}
            onSelect={setActiveParticipant}
            participants={participants}
          />
          <NavItemWrapper>
            {activeData.compatibilities.map((compatibility, index) => (
              <LikesContents
                key={index}
                title={`[${compatibility.partner}] 님과 함께 좋아하는 음식`}
                answer={
                  compatibility.togetherLikesChoices
                    ? compatibility.togetherLikesChoices.join(", ")
                    : "없음"
                }
                matchScore={compatibility.rate}
              />
            ))}
          </NavItemWrapper>
        </NavbarWrapper>
      </TopContentsWrapper>

      <BottomContentsWrapper>
        <ResultIconGroup platformName={platformName} />
        <ResultBottomButtonGroup />
      </BottomContentsWrapper>
    </BaseContainer>
  );
};

export default ResultLoadedPage;
