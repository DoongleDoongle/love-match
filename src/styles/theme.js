const toasterHeight = 60;

const theme = {
  colors: {
    primary: "#2B3467", // 1차색, 짙은 파랑
    secondary: "#EB455F", // 2차색, 베이지
    tertiary: "#BAD7E9", // 3차색,
    quaternary: "#FEFAF6", // 4차색,
    quinary: "", // 5차색,
    lightBlueGrey: "#A3B4C6", // 밝은 파랑/회색
    softRose: "#B48291", // 부드러운 로즈
    softBlue: "#829AB1", // 소프트 블루
    success: "#28a745", // 성공 녹색
    error: "#dc3545", // 오류 빨강
    warning: "#ffc107", // 경고 황색
    info: "#17a2b8", // 정보 청색
    light: "#FEFAF6", // 매우 밝은 거의 흰색
    dark: "#343a40", // 짙은 회색
    white: "#fff",
    text: "#333", // 거의 검정색
    background: "#FFFFFA", // light랑 동일
  },
  fontSizes: {
    extraSmall: "10px",
    small: "12px",
    semiSmall: "14px",
    base: "16px",
    semiLarge: "18px",
    large: "20px",
    extraLarge: "24px",
    huge: "28px",
  },
  spacings: {
    extraSmall: "4px",
    small: "8px",
    base: "16px",
    large: "24px",
    extraLarge: "32px",
    huge: "40px",
  },
  borderRadius: {
    small: "2px",
    base: "5px",
    large: "10px",
    pill: "50px",
  },
  shadows: {
    light: "0 1px 3px rgba(0, 0, 0, 0.12)",
    medium: "0 10px 20px rgba(0, 0, 0, 0.19)",
    heavy: "0 15px 25px rgba(0, 0, 0, 0.25)",
  },
  transitions: {
    quick: "all 0.3s ease-in-out",
    normal: "all 0.5s ease-in-out",
    slow: "all 0.75s ease-in-out",
  },
  header: {
    height: `${toasterHeight + 60}px`,
  },
};

export default theme;
