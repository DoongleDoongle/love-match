// GlobalStyle.js
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
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  #root {
  display: flex;
  flex-direction: column;
  flex: 1;  // 이를 통해 body의 남은 높이를 채움
    max-width: 500px;  // 모바일 디바이스 최대 너비
    margin: 0 auto;     // 화면 중앙 정렬
    width: 100%;        // 전체 너비를 사용하되, 최대 너비는 500px
  }
`;

export default GlobalStyle;
