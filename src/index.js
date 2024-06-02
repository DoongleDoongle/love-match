import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 카카오 SDK 초기화
const kakaoApiKey = "b0c09fc4adc6a1409409856b6ae24c9c";
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
