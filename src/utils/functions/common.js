export const isEmpty = (value) => {
  // null이나 undefined인 경우
  if (value == null) return true;

  // 배열이나 문자열의 경우, 길이가 0인지 확인
  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }

  // 객체의 경우, 속성이 있는지 확인
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }

  // 숫자나 불리언 같은 다른 타입은 "비어있지 않음"으로 처리
  return false;
};

export const translatePlatformNameToKorean = (platformName = "") => {
  switch (platformName) {
    case "taste-match":
      return "입맛 궁합 테스트";
    case "place-match":
      return "데이트 장소 궁합 테스트";
    case "hobby-match":
      return "취미 궁합 테스트";
    case "propensity-match":
      return "성향 궁합 테스트";
    case "some-match":
      return "썸 궁합 테스트";
    default:
      return "궁합 테스트";
  }
};
