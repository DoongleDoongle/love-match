import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Header from "components/common/Header";
import Sidebar from "components/common/Sidebar";
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
import HomePage from "pages/home/HomePage";
import RandomPage from "pages/\bice-breaking-game/random-topic/RandomPage";

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
              <Route path="/" element={<HomePage />} />

              <Route
                path={TASTE_MATCH_ROOT_PATH}
                element={
                  <StartPage
                    platformTitle="입맛 궁합 테스트"
                    platformDescription="짜장 vs 짬뽕! 밸런스 궁합 테스트\n테스트 후, 친구를 초대해 궁합을 확인하세요!"
                  />
                }
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
                    platformDescription="산 vs 바다! 밸런스 궁합 테스트\n테스트 후, 친구를 초대해 궁합을 확인하세요!"
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
                path={"hobby-match"}
                element={
                  <StartPage
                    platformTitle="취미 궁합 테스트"
                    platformDescription="넷플릭스 vs 유튜브! 밸런스 궁합 테스트\n테스트 후, 친구를 초대해 궁합을 확인하세요!"
                  />
                }
              />
              <Route
                path={"hobby-match/rooms/:roomId"}
                element={<RoomPage />}
              />
              <Route
                path={"hobby-match/rooms/:roomId/results"}
                element={<ResultPage choiceTopic="취미" />}
              />

              <Route
                path={"propensity-match"}
                element={
                  <StartPage
                    platformTitle="성향 궁합 테스트"
                    platformDescription="사랑 vs 우정! 밸런스 궁합 테스트\n테스트 후, 친구를 초대해 궁합을 확인하세요!"
                  />
                }
              />
              <Route
                path={"propensity-match/rooms/:roomId"}
                element={<RoomPage />}
              />
              <Route
                path={"propensity-match/rooms/:roomId/results"}
                element={<ResultPage choiceTopic="성향" />}
              />

              <Route
                path={"some-match"}
                element={
                  <StartPage
                    platformTitle="썸 궁합 테스트"
                    platformDescription="스킨십은? 천천히 vs 빠르게! 밸런스 궁합 테스트\n테스트 후, 친구를 초대해 궁합을 확인하세요!"
                  />
                }
              />
              <Route path={"some-match/rooms/:roomId"} element={<RoomPage />} />
              <Route
                path={"some-match/rooms/:roomId/results"}
                element={<ResultPage choiceTopic="연애 스타일" />}
              />

              <Route
                path={"random-topic/:platformId"}
                element={<RandomPage />}
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
      </Router>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
};

export default App;
