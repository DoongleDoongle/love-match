import React, { useState } from "react";
import styled from "styled-components";
import { Nav } from "rsuite";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const TogetherLikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 70%;
`;

const TogetherLikesTitle = styled.div`
  margin: 10px;
  font-size: ${({ theme }) => theme.fontSizes.extraLarge};
  font-weight: bold;
`;

const TogetherLikesContent = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const CompatibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacings.huge};
  padding: ${({ theme }) => theme.spacings.base};
  color: ${({ theme }) => theme.colors.softRose};
  background-color: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => `solid 1px ${theme.colors.softRose}`};
  border-radius: ${({ theme }) => theme.borderRadius.base};
`;

const CompatibilityLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.huge};
  font-weight: 1000;
`;

const CompatibilityRate = styled.div`
  margin-left: 20px;
  font-size: ${({ theme }) => theme.fontSizes.huge};
`;

const NavItem = styled(Nav.Item)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  text-align: center;
  color: ${({ theme }) => theme.colors.softRose};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Navbar = ({ active, onSelect, ...props }) => {
  return (
    <Nav
      {...props}
      activeKey={active}
      onSelect={onSelect}
      style={{ width: "90%" }}
    >
      <NavItem eventKey="우림">우림</NavItem>
      <NavItem eventKey="주현">주현</NavItem>
      <NavItem eventKey="주영">주영</NavItem>
      <NavItem eventKey="영진">영진</NavItem>
      <NavItem eventKey="산정">산정</NavItem>
    </Nav>
  );
};

const ResultPage = () => {
  const [active, setActive] = useState("우림");

  const togetherLikesTitle = "우리가 함께 좋아하는 음식";
  const togetherLikesContent =
    "딸기, 짜장면, 랍스타, 바나나, 사과, 포도, 스테이크, 샐러드, 쌀밥, 피자, 스파게티, 치킨, 김밥, 떡볶이, 삼겹살, 아이스크림, 초밥, 라면, 샌드위치, 팬케이크";

  return (
    <Container>
      <TogetherLikesContainer>
        <TogetherLikesTitle>{togetherLikesTitle}</TogetherLikesTitle>
        <TogetherLikesContent>{togetherLikesContent}</TogetherLikesContent>
      </TogetherLikesContainer>
      <CompatibilityContainer>
        <CompatibilityLabel>궁합도: </CompatibilityLabel>
        <CompatibilityRate>100%</CompatibilityRate>
      </CompatibilityContainer>
      <Navbar appearance="tabs" active={active} onSelect={setActive} />
      <TogetherLikesContainer>
        <TogetherLikesTitle>{togetherLikesTitle}</TogetherLikesTitle>
        <TogetherLikesContent>{togetherLikesContent}</TogetherLikesContent>
      </TogetherLikesContainer>
      <TogetherLikesContainer>
        <TogetherLikesTitle>{togetherLikesTitle}</TogetherLikesTitle>
        <TogetherLikesContent>{togetherLikesContent}</TogetherLikesContent>
      </TogetherLikesContainer>
      <TogetherLikesContainer>
        <TogetherLikesTitle>{togetherLikesTitle}</TogetherLikesTitle>
        <TogetherLikesContent>{togetherLikesContent}</TogetherLikesContent>
      </TogetherLikesContainer>
    </Container>
  );
};

export default ResultPage;
