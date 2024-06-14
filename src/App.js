import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Header from "components/common/Header";
import Sidebar from "components/common/Sidebar";
// import Footer from "components/common/Footer";
import useViewportHeight from "hooks/common/useViewportHeight";
import { calculateMainLayoutHeight } from "styles/functions";

import StartPage from "pages/taste-match/StartPage";
import RoomPage from "pages/taste-match/RoomPage";
import ResultPage from "pages/taste-match/results/ResultPage";
import DeveloperPage from "pages/contacts/DeveloperPage";

// 라우트 정적 변수
import {
  $ROOM_ID_PATH,
  TASTE_MATCH_ROOT_PATH,
  TASTE_MATCH_ROOMS_PATH,
  TASTE_MATCH_RESULTS_PATH,
} from "configs/route/routeConfig";

const MainLayout = styled.div`
  width: 100%;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  overflow-y: auto;
  overflow-x: hidden; // 좌우 스크롤 없애기

  /* 스크롤바 스타일링 (웹킷 브라우저 전용) */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
    border: 3px solid white; // 스크롤바 주변에 여백을 줌
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background};
    border: 1px solid rgb(0, 0, 0, 0.2);
    border-radius: 10px;
  }
`;

const App = () => {
  useViewportHeight();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header title="러브매치" onMenuClick={handleMenuClick} />
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        <Suspense fallback={<div>Loading...</div>}>
          <MainLayout isOpen={isSidebarOpen}>
            <Routes>
              <Route
                path={TASTE_MATCH_ROOT_PATH}
                element={<StartPage platformTitle="입맛 궁합 테스트" />}
              />
              <Route
                path={`${TASTE_MATCH_ROOMS_PATH}/${$ROOM_ID_PATH}`}
                element={<RoomPage />}
              />
              <Route
                path={TASTE_MATCH_RESULTS_PATH}
                element={<ResultPage choiceTopic="음식" />}
              />

              <Route
                path={"place-match"}
                element={
                  <StartPage
                    platformTitle="데이트 장소 궁합 테스트"
                    platformTitleSize="35px"
                  />
                }
              />
              <Route
                path={"place-match/rooms/:roomId"}
                element={<RoomPage />}
              />
              <Route
                path={"place-match/rooms/:roomId/results"}
                element={<ResultPage choiceTopic="데이트 장소" />}
              />

              <Route
                path={"contacts/developer"}
                element={
                  <DeveloperPage platformTitle="개발자에게 피드백주기" />
                }
              />
            </Routes>
          </MainLayout>
        </Suspense>
        {/* <Footer>푸터</Footer> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
