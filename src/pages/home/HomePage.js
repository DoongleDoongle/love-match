import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import CoupangPartners from "components/common/advertisement/CoupangParters";
import Footer from "components/common/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  const banners = [
    {
      redirectUrl: "/",
      imageUrl: "/banners/홈_배너_001.png",
    },
    {
      redirectUrl: "/",
      imageUrl: "/banners/홈_배너_002.png",
    },
  ];

  const cards = [
    {
      img: "/games/balance-match/taste-match/index.png",
      title: "입맛 궁합 테스트",
      redirectUrl: "/taste-match",
      likes: 4328,
    },
    {
      img: "/games/balance-match/place-match/index.png",
      title: "데이트 장소 궁합 테스트",
      redirectUrl: "/place-match",
      likes: 4134,
    },
    {
      img: "/games/balance-match/hobby-match/index.png",
      title: "취미 궁합 테스트",
      redirectUrl: "/hobby-match",
      likes: 5826,
    },
    {
      img: "/games/balance-match/propensity-match/index.png",
      title: "성향 궁합 테스트",
      redirectUrl: "/propensity-match",
      likes: 2432,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container>
      <BannerSlider {...settings}>
        {banners.map(({ imageUrl, redirectUrl }, index) => (
          <BannerWrapper key={index} onClick={() => navigate(redirectUrl)}>
            <Banner src={imageUrl} alt={`Banner ${index + 1}`} />
          </BannerWrapper>
        ))}
      </BannerSlider>

      <TopicAreaWrapper>
        <TopicTextWrapper>
          <TopicTitle>궁합 테스트</TopicTitle>
          <TopicDescription>우리 사이, 이대로 괜찮을까?</TopicDescription>
        </TopicTextWrapper>

        <CardList>
          {cards.map((card, index) => (
            <Card key={index} onClick={() => navigate(card.redirectUrl)}>
              <CardImage src={card.img} alt={card.title} />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardLikes>❤️ {card.likes}</CardLikes>
              </CardContent>
            </Card>
          ))}
        </CardList>
      </TopicAreaWrapper>

      <CoupangPartners />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const BannerSlider = styled(Slider)`
  width: 100%;
  aspect-ratio: 16 / 9; /* aspect-ratio 설정 */
  background-color: ${({ theme }) => theme.colors.background};
  margin-bottom: 5px;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%; /* 부모의 높이를 채우도록 설정 */
`;

const Banner = styled.img`
  width: 100%;
  height: 100%; /* 부모의 높이를 채우도록 설정 */
  object-fit: cover; /* 이미지가 컨테이너를 꽉 채우도록 설정 */
  cursor: pointer; /* 클릭 가능하게 커서 변경 */
`;

const TopicAreaWrapper = styled.div`
  padding: 30px 20px;
`;

const TopicTextWrapper = styled.div`
  margin-bottom: 10px;
`;

const TopicTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`;

const TopicDescription = styled.div``;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.3s;
  }

  &:active {
    transform: scale(0.98);
    transition: transform 0.3s;
  }
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const CardContent = styled.div`
  width: 100%;
  padding: 10px 0 0 0;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardLikes = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0 0 0;
`;

export default HomePage;
