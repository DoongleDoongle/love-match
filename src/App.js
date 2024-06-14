import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Header from "components/common/Header";
import Sidebar from "components/common/Sidebar";
// import Footer from "components/common/Footer";
import useViewportHeight from "hooks/common/useViewportHeight";

import MainLayout from "MainLayout";
import StartPage from "pages/balance-match/StartPage";
import RoomPage from "pages/balance-match/RoomPage";
import ResultPage from "pages/balance-match/results/ResultPage";
import DeveloperPage from "pages/contacts/DeveloperPage";

// 라우트 정적 변수
import {
  $ROOM_ID_PATH,
  TASTE_MATCH_ROOT_PATH,
  TASTE_MATCH_ROOMS_PATH,
  TASTE_MATCH_RESULTS_PATH,
} from "configs/route/routeConfig";

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
