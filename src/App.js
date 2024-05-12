// App.js
import React, { Suspense } from "react"; // Suspense 임포트 추가
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Header from "components/common/Header";
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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header>러브 매치</Header>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={TASTE_MATCH_ROOT_PATH} element={<StartPage />} />
            <Route
              path={`${TASTE_MATCH_ROOMS_PATH}/${$ROOM_ID_PATH}`}
              element={<RoomPage />}
            />
            <Route path={TASTE_MATCH_RESULTS_PATH} element={<ResultPage />} />
          </Routes>
        </Suspense>
        {/* <Footer>푸터</Footer> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;
