import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --vh: 1vh; /* 모바일의 여러 브라우저별 주소 표시줄과 툴바 등을 제외한 전체 높이(기본 초기값, useViewportHeight 훅에서 정의함) */
  }

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
