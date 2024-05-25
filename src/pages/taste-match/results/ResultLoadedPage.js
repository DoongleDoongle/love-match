import React, { useState } from "react";
import styled from "styled-components";
import { usePlatformNameData } from "hooks/common/usePlatformNameData";

import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import Navbar from "components/taste-match/result-page/Navbar";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";

const CompatibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: ${({ theme }) => theme.spacings.base};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.background};
  /* border: ${({ theme }) => `solid 1px ${theme.colors.primary}`};
  border-radius: ${({ theme }) => theme.borderRadius.base}; */
`;

const CompatibilityLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.huge};
  font-weight: 1000;
`;

const CompatibilityRate = styled.div`
  margin-left: 20px;
  font-size: ${({ theme }) => theme.fontSizes.huge};
`;

const ResultLoadedPage = ({ allParticipants, participants }) => {
  const { platformName } = usePlatformNameData();
  const [activeParticipant, setActiveParticipant] = useState(
    participants[0].nickname
  );

  const activeData = participants.find((p) => p.nickname === activeParticipant);

  return (
    <BaseContainer>
      <LikesContents
        title="모두가 좋아하는 음식"
        answer={allParticipants.togetherLikesChoices.join(", ")}
      />

      <CompatibilityContainer>
        <CompatibilityLabel>궁합도: </CompatibilityLabel>
        <CompatibilityRate>{allParticipants.rate}</CompatibilityRate>
      </CompatibilityContainer>

      <Navbar
        appearance="tabs"
        active={activeParticipant}
        onSelect={setActiveParticipant}
        participants={participants}
      />

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

      <ResultIconGroup platformName={platformName} />
      <ResultBottomButtonGroup />
    </BaseContainer>
  );
};

export default ResultLoadedPage;
