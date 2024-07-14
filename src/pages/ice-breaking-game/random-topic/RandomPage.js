import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemFactory from "utils/functions/ice-breaking-game/random-topic/ItemFactory";

import {
  Container,
  TitleWrapper,
  Title,
  Topic,
  ContentsWrapper,
  Content,
  Ripple,
} from "components/ice-breaking-game/random-topic";

const getRandomContentIndex = (items) => {
  const availableContents = items.filter((item) => !item.isDisplayed);
  const randomIndex = Math.floor(Math.random() * availableContents.length);
  return items.indexOf(availableContents[randomIndex]);
};

const RandomPage = () => {
  const { platformId } = useParams();
  const [items, setItems] = useState([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(null);
  const [ripples, setRipples] = useState([]);

  // 컴포넌트 마운트 시, platformId를 사용하여 items 초기화
  useEffect(() => {
    const initialItems = ItemFactory.getItemByPlatformId(platformId);
    setItems(initialItems);
    setCurrentContentIndex(getRandomContentIndex(initialItems));
  }, [platformId]);

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

      <Topic>{items[currentContentIndex]?.topic}</Topic>
      <ContentsWrapper>
        {currentContentIndex >= 0 ? (
          items[currentContentIndex]?.contents.map((content, index) => (
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
