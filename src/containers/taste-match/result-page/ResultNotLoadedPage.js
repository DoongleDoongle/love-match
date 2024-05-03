import React from "react";
import styled from "styled-components";

import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "../../../components/taste-match/result-page/LikesContents/LikesContents";
import ShereMessageForm from "components/taste-match/result-page/ShereMessageForm";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";

const Message = styled.div`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: bold;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: ${({ height }) => height || "1px"};
  background-color: ${({ color }) => color || "#ccc"};
  margin: ${({ margin }) => margin || "0"};
  /* border: ${({ height, lineStyle, color }) =>
    `${height || "1px"} ${lineStyle || "solid"} ${color || "#ccc"}`}; */
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

      <ShereMessageForm />
      <HorizontalLine></HorizontalLine>

      <ResultIconGroup />
      <ResultBottomButtonGroup />
    </BaseContainer>
  );
};

export default ResultNotLoadedPage;
