import React, { useState } from "react";
import styled from "styled-components";
import Button from "components/common/utils/Button";

import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "../../../components/taste-match/result-page/LikesContents/LikesContents";

const Message = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: ${({ height }) => height || "1px"};
  background-color: ${({ color }) => color || "#ccc"};
  margin: ${({ margin }) => margin || "20px 0"};
  /* border: ${({ height, lineStyle, color }) =>
    `${height || "1px"} ${lineStyle || "solid"} ${color || "#ccc"}`}; */
`;

const ShereMessage = styled.div`
  margin: 20px 0;
`;

const ShereBottomMessage = styled.div`
  margin-top: 2px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.primary};
`;

const ResultNotLoadedPage = () => {
  return (
    <BaseContainer>
      <LikesContents
        title="내가 좋아하는 음식"
        answer="딸기, 짜장면, 랍스타, 바나나, 사과, 포도, 스테이크, 샐러드, 쌀밥, 피자, 스파게티, 치킨, 김밥, 떡볶이, 삼겹살, 아이스크림, 초밥, 라면, 샌드위치, 팬케이크"
      />

      <Message>"오늘은 한식이 끌리는 날이군요 :D"</Message>
      <HorizontalLine></HorizontalLine>

      <ShereMessage>{`아직 함께한 친구가 없군요.\n친구에게 게임을 공유해주세요.`}</ShereMessage>
      <Button width="50%">친구에게 공유하기</Button>
      <ShereBottomMessage>
        친구가 참여하면 궁합 정보를 볼 수 있어요
      </ShereBottomMessage>
    </BaseContainer>
  );
};

export default ResultNotLoadedPage;
