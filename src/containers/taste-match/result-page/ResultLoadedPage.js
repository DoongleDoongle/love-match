import React, { useState } from "react";
import styled from "styled-components";

import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import Navbar from "components/taste-match/result-page/Navbar";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";

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

const ResultLoadedPage = ({ participants }) => {
  const [activeParticipant, setActiveParticipant] = useState(
    participants[0].name
  );

  const activeData = participants.find((p) => p.name === activeParticipant);

  return (
    <BaseContainer>
      <LikesContents
        title="우리가 함께 좋아하는 음식"
        answer="딸기, 짜장면, 랍스타, 바나나, 사과, 포도, 스테이크, 샐러드, 쌀밥, 피자, 스파게티, 치킨, 김밥, 떡볶이, 삼겹살, 아이스크림, 초밥, 라면, 샌드위치, 팬케이크"
      />

      <CompatibilityContainer>
        <CompatibilityLabel>궁합도: </CompatibilityLabel>
        <CompatibilityRate>100%</CompatibilityRate>
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
          title={`${compatibility.partner}와 함께 좋아하는 음식`}
          answer={
            compatibility.togetherLikesMenus
              ? compatibility.togetherLikesMenus.join(", ")
              : "없음"
          }
          matchScore={compatibility.rate}
        />
      ))}

      <ResultIconGroup />
    </BaseContainer>
  );
};

export default ResultLoadedPage;
