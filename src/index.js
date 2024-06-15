import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 카카오 SDK 초기화
const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;
if (!window.Kakao.isInitialized() && kakaoApiKey) {
  window.Kakao.init(kakaoApiKey);
} else {
  console.error("Kakao API key is missing or initialization failed.");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
