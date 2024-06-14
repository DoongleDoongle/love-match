import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "./utils/Image";
import Toaster from "./Toaster";
import logoImage from "assets/common/love-match-logo.png";

const StyledHeader = styled.header`
  font-family: "Single Day";
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 0.5px 0px rgba(253, 154, 48, 1); // 하단에 얇은 그림자 생성
  /* border-bottom: 1px solid lightgrey; */
  height: ${({ theme }) => theme.header.height}; // 헤더 높이를 고정
  padding: 0 16px;
`;

const TitleWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.extraLarge};
  color: ${(props) => props.theme.colors.primary};
  margin: 0;
`;

const LogoImage = styled(Image)`
  cursor: pointer; // 클릭할 수 있도록 포인터 커서 설정
  padding: 0;

  // 이미지의 scale()을 확대하고, width를 고정시키고,
  // object-fit을 cover로 설정함으로써 좌우 벗어나는 크기는 잘라버린다. -> 이미지 크기를 키운다.
  transform: scale(1);
  /* width: 38px; */
  /* height: 80px; */
  object-fit: cover;

  transition: transform 0.3s ease; // 호버 및 포커스 시 애니메이션 설정
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  cursor: pointer; // 클릭할 수 있도록 포인터 커서 설정
  font-size: 24px;
  /* color: ${(props) => props.theme.colors.secondary}; */
  transition: transform 0.3s ease; // 호버 및 포커스 시 애니메이션 설정
  &:hover,
  &:focus {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.8);
  }
`;

const Header = ({ title = "러브매치", onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <>
      <StyledHeader>
        <MenuIcon icon={faBars} onClick={onMenuClick} />
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <LogoImage
          src={logoImage}
          width="50px"
          alt="Logo"
          onClick={handleLogoClick}
        />
      </StyledHeader>

      <Toaster showIcon type="info" closable>
        [공지] 현재는 베타 서비스 기간입니다.
      </Toaster>
    </>
  );
};

export default Header;
