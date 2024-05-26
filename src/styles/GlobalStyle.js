import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Nanum Gothic', sans-serif;
    font-style: normal;
    overflow: hidden; // body의 스크롤을 막음
  }

  #root {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
    min-height: 100vh; // 최소 높이를 뷰포트 높이로 설정
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.text};
    background-color: ${(props) => props.theme.colors.background};
    overflow-y: auto; // root에 스크롤을 적용
  }
`;

export default GlobalStyle;
