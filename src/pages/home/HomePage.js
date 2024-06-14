import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import styled from "styled-components";
import Slider from "react-slick";

const HomePage = () => {
  const banners = [
    {
      redirectUrl: "/",
      imageUrl: "https://via.placeholder.com/800x300?text=Banner+1",
    },
    {
      redirectUrl: "/",
      imageUrl: "https://via.placeholder.com/800x300?text=Banner+2",
    },
    {
      redirectUrl: "/",
      imageUrl: "https://via.placeholder.com/800x300?text=Banner+3",
    },
  ];

  const cards = [
    {
      img: "https://via.placeholder.com/200",
      title: "Card 1",
      redirectUrl: "/",
      likes: 100,
    },
    {
      img: "https://via.placeholder.com/200",
      title: "Card 2",
      redirectUrl: "/",
      likes: 200,
    },
    {
      img: "https://via.placeholder.com/200",
      title: "Card 3",
      redirectUrl: "/",
      likes: 300,
    },
    {
      img: "https://via.placeholder.com/200",
      title: "Card 4",
      redirectUrl: "/",
      likes: 400,
    },
    {
      img: "https://via.placeholder.com/200",
      title: "Card 3",
      redirectUrl: "/",
      likes: 300,
    },
    {
      img: "https://via.placeholder.com/200",
      title: "Card 4",
      redirectUrl: "/",
      likes: 400,
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
          <Banner
            key={index}
            src={imageUrl}
            alt={`Banner ${index + 1}`}
            onClick={() => (window.location.href = redirectUrl)}
          />
        ))}
      </BannerSlider>
      <CardList>
        {cards.map((card, index) => (
          <Card
            key={index}
            onClick={() => (window.location.href = card.redirectUrl)}
          >
            <CardImage src={card.img} alt={card.title} />
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardLikes>❤️ {card.likes}</CardLikes>
            </CardContent>
          </Card>
        ))}
      </CardList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const BannerSlider = styled(Slider)`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-slide img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const Banner = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 카드가 그리드 셀의 너비를 채우도록 설정 */

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
  width: 100%; /* 카드 이미지가 부모의 너비를 채우도록 설정 */
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  width: 100%;
  padding: 10px 0 0 10px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const CardLikes = styled.p`
  font-size: 14px;
  color: #888;
  margin: 5px 0 0 0;
`;

export default HomePage;
