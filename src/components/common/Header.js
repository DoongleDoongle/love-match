// Header.js
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Image from "./utils/Image";
import logoImage from "assets/common/love-match-logo.png";

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.extraLarge};
  margin: 0;
`;

const LogoImage = styled(Image)`
  cursor: pointer; // 클릭할 수 있도록 포인터 커서 설정
  position: absolute;
  right: 1px; // 로고 이미지가 오른쪽에 붙도록 설정
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease; // 호버 및 포커스 시 애니메이션 설정

  &:hover,
  &:focus {
    transform: scale(1.05); // 호버 및 포커스 시 확대
  }
`;

const Header = ({ title = "러브매치" }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/taste-match"); // 홈으로 이동
  };

  return (
    <StyledHeader>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <LogoImage
        src={logoImage}
        width="20%"
        alt="Logo"
        onClick={handleLogoClick}
      />
    </StyledHeader>
  );
};

export default Header;
