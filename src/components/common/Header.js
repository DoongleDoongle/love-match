// Header.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Image from "./utils/Image";
import logoImage from "assets/common/love-match-logo.png";

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: ${({ theme }) => theme.header.height}; // 헤더 높이를 고정
  padding: 0 16px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.extraLarge};
  margin: 0;
`;

const LogoImage = styled(Image)`
  cursor: pointer; // 클릭할 수 있도록 포인터 커서 설정
  transition: transform 0.3s ease; // 호버 및 포커스 시 애니메이션 설정
  &:hover,
  &:focus {
    transform: scale(1.05); // 호버 및 포커스 시 확대
  }
`;

const MenuIcon = styled(FontAwesomeIcon)`
  cursor: pointer; // 클릭할 수 있도록 포인터 커서 설정
  font-size: 24px;
`;

const Header = ({ title = "러브매치", onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/taste-match"); // 홈으로 이동
  };

  return (
    <StyledHeader>
      <MenuIcon icon={faBars} onClick={onMenuClick} />
      <Title>{title}</Title>
      <LogoImage
        src={logoImage}
        width="50px"
        alt="Logo"
        onClick={handleLogoClick}
      />
    </StyledHeader>
  );
};

export default Header;
