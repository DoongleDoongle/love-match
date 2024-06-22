import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  top: 100px;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  width: 100%;
  font-family: "Poor Story";
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const Ripple = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  animation: ${ripple} 1s linear;
  pointer-events: none;
  width: 50px;
  height: 50px;
`;

const RandomPage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(
    getRandomMessageIndex(messages)
  );
  const [ripples, setRipples] = useState([]);

  const handleClick = (event) => {
    if (currentMessageIndex >= 0) {
      messages[currentMessageIndex].isDisplayed = true;
    } else {
      messages.map((message) => (message.isDisplayed = false));
    }

    const newIndex = getRandomMessageIndex(messages);
    setCurrentMessageIndex(newIndex);

    const x = event.clientX;
    const y = event.clientY;
    const id = new Date().getTime();

    setRipples((oldRipples) => [...oldRipples, { x, y, id }]);

    setTimeout(() => {
      setRipples((oldRipples) =>
        oldRipples.filter((ripple) => ripple.id !== id)
      );
    }, 1000); // 1초 후에 물방울 제거
  };

  return (
    <Container onClick={handleClick}>
      <Title>화면을 터치해주세요.</Title>
      <MessageWrapper>
        {currentMessageIndex >= 0
          ? messages[currentMessageIndex].message
              .split("\n")
              .map((a) => <Message>{a}</Message>)
          : "주제가 소진되었어요. 다시 시작할게요."}
      </MessageWrapper>
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          style={{ left: ripple.x - 50 + "px", top: ripple.y - 50 + "px" }}
        />
      ))}
    </Container>
  );
};

const messages = [
  {
    message:
      "좋아하는 음식이 뭐에요?\n최근에 가장 맛있었던 메뉴 추천해주세요.\n자주 가는 식당있으세요?",
    isDisplayed: false,
  },
  {
    message:
      "여행: 가고 싶은 여행지, 여행 중 기억에 남는 에피소드, 추천 여행지",
    isDisplayed: false,
  },
  {
    message: "취미: 취미 생활, 새로운 취미 도전, 취미 관련 이야기",
    isDisplayed: false,
  },
  {
    message: "영화/드라마: 최근 본 영화나 드라마, 추천 작품, 좋아하는 배우",
    isDisplayed: false,
  },
  {
    message: "음악: 좋아하는 음악 장르, 좋아하는 가수, 콘서트 경험",
    isDisplayed: false,
  },
  {
    message: "운동: 즐겨하는 운동, 운동 루틴, 스포츠 경기 관람",
    isDisplayed: false,
  },
  { message: "책: 최근 읽은 책, 추천 책, 좋아하는 작가", isDisplayed: false },
  {
    message: "애완동물: 키우는 반려동물 이야기, 반려동물과의 추억, 동물 사랑",
    isDisplayed: false,
  },
  {
    message: "카페: 좋아하는 카페, 카페에서 즐겨 마시는 음료, 추천 카페",
    isDisplayed: false,
  },
  {
    message: "패션: 스타일, 옷 쇼핑 이야기, 좋아하는 브랜드",
    isDisplayed: false,
  },
  {
    message: "계절: 좋아하는 계절, 계절별 활동, 계절 음식",
    isDisplayed: false,
  },
  {
    message: "학창 시절: 학교 생활, 학창 시절 추억, 동창회",
    isDisplayed: false,
  },
  {
    message: "자기 계발: 배우고 싶은 것, 새로운 도전, 자기 계발 방법",
    isDisplayed: false,
  },
  { message: "문화: 전통 문화, 문화 행사, 전시회 관람", isDisplayed: false },
  {
    message: "요리: 직접 해 본 요리, 요리 레시피 공유, 요리 팁",
    isDisplayed: false,
  },
  {
    message: "사회 이슈: 최근 뉴스, 사회적 이슈에 대한 생각, 토론",
    isDisplayed: false,
  },
  { message: "미래 계획: 장래 희망, 미래 목표, 인생 계획", isDisplayed: false },
  { message: "가족: 가족 이야기, 형제 자매, 가족 모임", isDisplayed: false },
  {
    message: "취직/직장 생활: 직장 이야기, 일상 업무, 직장 생활 팁",
    isDisplayed: false,
  },
  { message: "건강: 건강 관리 방법, 운동 습관, 건강 식단", isDisplayed: false },
  { message: "경제: 경제 상황, 투자 이야기, 재테크 팁", isDisplayed: false },
  {
    message: "교육: 교육 경험, 배우고 싶은 것, 교육 관련 이야기",
    isDisplayed: false,
  },
  { message: "사진: 사진 찍기, 사진 공유, 사진 관련 팁", isDisplayed: false },
  { message: "자연: 자연 경관, 자연 탐방, 캠핑 이야기", isDisplayed: false },
  {
    message: "자전거: 자전거 타기, 자전거 여행, 자전거 관련 팁",
    isDisplayed: false,
  },
  {
    message: "자동차: 좋아하는 자동차, 운전 경험, 자동차 여행",
    isDisplayed: false,
  },
  {
    message: "봉사활동: 봉사활동 경험, 봉사활동 추천, 사회 공헌",
    isDisplayed: false,
  },
  { message: "기술: 최신 기술, IT 관련 이야기, 기술 발전", isDisplayed: false },
  { message: "게임: 좋아하는 게임, 게임 경험, 게임 추천", isDisplayed: false },
  {
    message: "유머: 재미있는 이야기, 유머 감각, 웃긴 에피소드",
    isDisplayed: false,
  },
];

const getRandomMessageIndex = (messages) => {
  const availableMessages = messages.filter((msg) => !msg.isDisplayed);
  if (availableMessages.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * availableMessages.length);
  return messages.indexOf(availableMessages[randomIndex]);
};

export default RandomPage;
