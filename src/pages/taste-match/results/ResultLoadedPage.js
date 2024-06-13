import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePlatformNameData } from "hooks/common/usePlatformNameData";

import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import Navbar from "components/taste-match/result-page/Navbar";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";

import { fetchChoicesByPlatformName } from "apis/queries";

const TopContentsWrapper = styled.div`
  display: flex;
  /* flex: 5; */
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BottomContentsWrapper = styled.div`
  /* flex: 5; */
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
  padding: 20px 0 0 20px;
  width: 100%;
`;

const CompatibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};
  /* background-color: ${({ theme }) => theme.colors.light}; */
  margin-bottom: 20px;
  padding: 0 20px;
  /* border-radius: 4px;
  box-shadow: 0 0.5px 2px 0 rgb(0, 0, 0, 0.3); */
  font-size: 16px;
  font-weight: 500;
`;

const CompatibilityLabel = styled.div``;

const CompatibilityRate = styled.div`
  margin-left: 5px;
`;

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 30px 0;
`;

const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* max-height: 40vh; // 스크롤을 적용할 최대 높이 설정 */
  /* overflow-y: scroll; // 내용이 넘칠 경우 스크롤 적용 */
  background-color: ${({ theme }) => theme.colors.light};

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
  const [allChoices, setAllChoices] = useState([]);
  const [activeParticipantNickname, setActiveParticipantNickname] = useState(
    participants[0].nickname
  );

  useEffect(() => {
    const fetchChoices = async () => {
      if (platformName) {
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
  }, [platformName]);

  const getChoices = (selectedChoiceIds, compareChoices) => {
    // compareChoices -> allChoices, selectedChoiceIds -> allParticipants.togetherLikesChoiceIds
    const selectedChoices = compareChoices.filter(({ id }) =>
      selectedChoiceIds.includes(id)
    );

    const selectedChoicesGrouping = compareChoices.reduce(
      (acc, selectedChoice) => {
        const foundChoices = compareChoices.filter(
          (choice) => choice.groupId === selectedChoice.groupId
        );

        const sortedChoices = foundChoices.sort((a, b) => a.id - b.id);
        const updatedChoices = sortedChoices.map((choice) => {
          return {
            ...choice,
            isSelected: selectedChoiceIds.includes(choice.id),
          };
        });
        return [...acc, updatedChoices];
      },
      []
    );

    const seenGroupIds = new Set();
    return selectedChoicesGrouping
      .filter((subArray) => {
        const groupId = subArray[0].groupId;
        if (seenGroupIds.has(groupId)) {
          return false;
        } else {
          seenGroupIds.add(groupId);
          return true;
        }
      })
      .reduce((acc, choicesGrouping) => {
        if (choicesGrouping.findIndex(({ isSelected }) => isSelected) > -1) {
          return [choicesGrouping, ...acc];
        }
        return [...acc, choicesGrouping];
      }, []);
  };

  const activeParticipant = participants.find(
    (p) => p.nickname === activeParticipantNickname
  );

  return (
    <BaseContainer>
      <TopContentsWrapper>
        <LikesContents
          title="모두가 좋아하는 음식"
          description="우리 방에 참여한 모두가 선택한 음식이에요!"
          choices={getChoices(
            allParticipants.togetherLikesChoiceIds,
            allChoices
          )}
          matchScore={allParticipants.rate}
        />

        <NavbarWrapper>
          <Navbar
            appearance="tabs"
            active={activeParticipantNickname}
            onSelect={setActiveParticipantNickname}
            participants={participants}
          />
          <NavItemWrapper>
            {activeParticipant.compatibilities.map((compatibility, index) => (
              <LikesContents
                key={index}
                title={`${compatibility.partner} 님과 함께 좋아하는 음식`}
                description="나만 선택한 음식의 사진은 어둡게 표시했어요!"
                choices={getChoices(
                  compatibility.togetherLikesChoiceIds,
                  allChoices
                )}
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
