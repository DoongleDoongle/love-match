import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    color: ${(props) => props.theme.colors.text};
  }

  #root {
    display: flex;
    flex-direction: column;
    flex: 1;  // 이를 통해 body의 남은 높이를 채움
    max-width: 500px;  // 모바일 디바이스 최대 너비
    margin: 0 auto;     // 화면 중앙 정렬
    width: 100%;        // 전체 너비를 사용하되, 최대 너비는 500px
    background-color: ${(props) => props.theme.colors.background};
    position: relative; // 사이드바 위치 조정을 위해 relative로 설정
  }
`;

export default GlobalStyle;
