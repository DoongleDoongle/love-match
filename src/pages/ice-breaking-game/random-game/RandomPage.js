import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";
import { someItems } from "apis/origin-data/ice-breaking-game/random-game/some-items";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  position: relative;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100px;
`;

const Title = styled.div`
  color: ${({ theme, color }) => color || theme.colors.secondary};
  font-weight: ${({ fontWeight }) => fontWeight || "none"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
`;

const Topic = styled.div`
  margin: 10px 0;
  padding: 0 0 2px 0;
  color: ${({ theme, color }) => color || theme.colors.primary};
  font-weight: bold;
  width: 90%;
  text-align: center;
  border-bottom: dotted 1px black;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  font-family: "Poor Story";
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  border: solid 1px black;
  border-radius: 4px;
  padding: 10px;
  margin: 2px 0;
  background-color: ${({ isChecked }) => (isChecked ? "black" : "white")};
  color: ${({ isChecked }) => (isChecked ? "darkgray" : "black")};
  text-decoration: ${({ isChecked }) => (isChecked ? "line-through" : "none")};
  cursor: pointer;
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

const getRandomContentIndex = (items) => {
  const availableContents = items.filter((item) => !item.isDisplayed);
  const randomIndex = Math.floor(Math.random() * availableContents.length);
  return items.indexOf(availableContents[randomIndex]);
};

const RandomPage = () => {
  const [items, setItems] = useState(someItems);
  const [currentContentIndex, setCurrentContentIndex] = useState(
    getRandomContentIndex(items)
  );
  const [ripples, setRipples] = useState([]);

  const handleClickContainer = (event) => {
    const newIndex = getRandomContentIndex(items);
    if (newIndex === -1) {
      for (const item of items) {
        item.isDisplayed = false;
        item.contents.forEach((content) => (content.isChecked = false));
      }
    }
    setCurrentContentIndex(newIndex);

    const x = event.clientX;
    const y = event.clientY;
    const id = new Date().getTime();

    setRipples((oldRipples) => [...oldRipples, { x, y, id }]);

    setTimeout(() => {
      setRipples((oldRipples) =>
        oldRipples.filter((ripple) => ripple.id !== id)
      );
    }, 1000);
  };

  const handleContentClick = (event, contentIndex) => {
    event.stopPropagation();
    const newItems = [...items];
    const currentItem = newItems[currentContentIndex];
    currentItem.contents[contentIndex].isChecked =
      !currentItem.contents[contentIndex].isChecked;

    // contents의 isChecked가 모두 true이면 isDisplayed를 false로 하여, 다신 노출이 안되도록 한다.
    if (currentItem.contents.every((content) => content.isChecked)) {
      currentItem.isDisplayed = true;
    }

    setItems(newItems);
  };

  return (
    <Container onClick={handleClickContainer}>
      <TitleWrapper>
        <Title color="black" fontSize="13px">
          빈 화면을 터치하면 주제가 변경됩니다.
        </Title>
        <Title fontWeight="bold">경청과 리액션을 충분히 해주세요.</Title>
        <Title fontWeight="bold">
          꼬리를 이은 질문은 분위기를 좋게 만들어줍니다.
        </Title>
      </TitleWrapper>

      <Topic>{items[currentContentIndex].topic}</Topic>
      <ContentsWrapper>
        {currentContentIndex >= 0 ? (
          items[currentContentIndex].contents.map((content, index) => (
            <Content
              key={index}
              isChecked={content.isChecked}
              onClick={(e) => handleContentClick(e, index)}
            >
              {content.text}
            </Content>
          ))
        ) : (
          <Content>주제가 소진되었어요. 다시 시작할게요.</Content>
        )}
      </ContentsWrapper>

      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          style={{ left: ripple.x - 50 + "px", top: ripple.y - 50 + "px" }}
        />
      ))}
    </Container>
  );
};

export default RandomPage;
