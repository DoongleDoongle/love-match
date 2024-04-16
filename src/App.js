// App.js
import React, { Suspense } from "react"; // Suspense 임포트 추가
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Header from "components/common/Header";
import Footer from "components/common/Footer";

const StartPage = React.lazy(() => import("containers/taste-match/StartPage"));
const QuestionPage = React.lazy(() =>
  import("containers/taste-match/QuestionPage")
);
const ResultPage = React.lazy(() =>
  import("containers/taste-match/ResultPage")
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Header>러브 매치</Header>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/taste-match" element={<StartPage />} />
            <Route path="/taste-match/questions" element={<QuestionPage />} />
            <Route path="/taste-match/results" element={<ResultPage />} />
          </Routes>
        </Suspense>
        <Footer>푸터</Footer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
