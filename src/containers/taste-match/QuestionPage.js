import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Progress } from "rsuite"; // 가이드: https://rsuitejs.com/components/
import "rsuite/dist/rsuite.min.css";

import theme from "styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1; // 남은 공간을 모두 채움
  width: 100%;
`;

const TextArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.huge};
  font-weight: bolder;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  transition: background-color 0.3s;

  ${({ active }) =>
    active &&
    css`
      background-color: ${theme.colors.lightBlueGrey}; // 선택 시 배경색 변경
    `}
`;

const VersusText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  position: fixed; // 위치를 고정시킵니다.
  top: 50%; // 상단에서 50% 위치
  left: 50%; // 왼쪽에서 50% 위치
  transform: translate(-50%, -50%); // 중앙 정렬
  font-weight: bold;
  z-index: 100; // 다른 요소 위에 오도록 z-index 설정
`;

const QuestionPage = () => {
  const navigate = useNavigate();
  const keywords = getKeywords();
  const [keywordIdx, setKeywordIdx] = useState(0);
  const [selected, setSelected] = useState(null); // 선택된 영역을 추적

  const clickTextArea = (type) => {
    setSelected(type);
    if (keywordIdx + 1 < keywords.length) {
      setTimeout(() => {
        setKeywordIdx(keywordIdx + 1);
        setSelected(null); // 다음 질문으로 넘어가면 선택 해제
      }, 500); // 선택 시 시각적 피드백을 제공한 후 다음으로 넘어감
    } else {
      navigate("/taste-match/results"); // keywords를 모두 표시한 후 다음 페이지로 이동
    }
  };

  const currentKeyword = keywords[keywordIdx];

  return (
    <Container>
      <TextArea
        onClick={() => clickTextArea("top")}
        active={selected === "top"}
      >
        {currentKeyword.top}
      </TextArea>

      <VersusText>VS</VersusText>
      <Progress.Line
        percent={((keywordIdx + 1) / keywords.length) * 100}
        strokeColor={theme.colors.softRose}
        showInfo={false}
        strokeWidth={10}
      />
      <TextArea
        onClick={() => clickTextArea("bottom")}
        active={selected === "bottom"}
      >
        {currentKeyword.bottom}
      </TextArea>
    </Container>
  );
};

const getKeywords = () => {
  return [
    { top: "피자", bottom: "파스타" },
    { top: "치킨", bottom: "맥주" },
    { top: "사케", bottom: "초밥" },
    { top: "라면", bottom: "김밥" },
    { top: "커피", bottom: "도넛" },
    { top: "스테이크", bottom: "와인" },
    { top: "햄버거", bottom: "감자튀김" },
    { top: "불고기", bottom: "두부김치" },
    { top: "삼겹살", bottom: "된장찌개" },
    { top: "아이스크림", bottom: "와플" },
    { top: "타코", bottom: "나초" },
    { top: "짜장면", bottom: "탕수육" },
    { top: "크로와상", bottom: "카푸치노" },
    { top: "소시지", bottom: "맥주" },
    { top: "오믈렛", bottom: "오렌지 주스" },
    { top: "팟타이", bottom: "새우깡" },
    { top: "참치회", bottom: "미소된장국" },
    { top: "족발", bottom: "보쌈" },
    { top: "수프", bottom: "샐러드" },
    { top: "떡볶이", bottom: "순대" },
    { top: "치즈", bottom: "와인" },
    { top: "토스트", bottom: "커피" },
    { top: "스시", bottom: "사시미" },
    { top: "바비큐", bottom: "맥주" },
    { top: "초밥", bottom: "우동" },
    { top: "팬케이크", bottom: "메이플 시럽" },
    { top: "라자냐", bottom: "가리비" },
    { top: "멕시칸 샐러드", bottom: "산그리아" },
    { top: "비빔밥", bottom: "육개장" },
    { top: "버터 치킨", bottom: "나안" },
  ];
};

export default QuestionPage;
