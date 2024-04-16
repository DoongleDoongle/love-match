// Footer.js
import styled from "styled-components";

const Footer = styled.footer`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.light};
  padding: 20px;
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  position: fixed;
  bottom: 0;
  left: 50%; // 중앙 정렬을 위해 left 값을 50%로 설정
  transform: translateX(
    -50%
  ); // X축 기준 50% 이동하여 정확히 중앙에 위치하도록 함
  width: 100%; // 너비는 100%로 설정
  max-width: 500px; // 최대 너비는 500px로 제한
  box-sizing: border-box; // 패딩을 너비에 포함
`;

export default Footer;
