// App.js
import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Header from "components/common/Header";
import Sidebar from "components/common/Sidebar";
// import Footer from "components/common/Footer";

import StartPage from "pages/taste-match/StartPage";
import RoomPage from "pages/taste-match/RoomPage";
import ResultPage from "pages/taste-match/results/ResultPage";

// 라우트 정적 변수
import {
  $ROOM_ID_PATH,
  TASTE_MATCH_ROOT_PATH,
  TASTE_MATCH_ROOMS_PATH,
  TASTE_MATCH_RESULTS_PATH,
} from "configs/route/routeConfig";

const MainLayout = styled.div``;

const App = () => {
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
              <Route path={TASTE_MATCH_ROOT_PATH} element={<StartPage />} />
              <Route
                path={`${TASTE_MATCH_ROOMS_PATH}/${$ROOM_ID_PATH}`}
                element={<RoomPage />}
              />
              <Route path={TASTE_MATCH_RESULTS_PATH} element={<ResultPage />} />
            </Routes>
          </MainLayout>
        </Suspense>
        {/* <Footer>푸터</Footer> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
