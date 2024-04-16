import styled from "styled-components";

const Input = styled.input`
  width: 100%; // 너비를 부모 컨테이너에 맞춤
  padding: 12px 20px; // 적절한 패딩으로 편안한 타이핑 경험 제공
  margin: 8px 0; // 요소 사이에 마진을 주어 시각적 공간 생성
  box-sizing: border-box; // 패딩과 테두리를 너비에 포함
  border: 2px solid #ccc; // 경계선 스타일 설정
  border-radius: 4px; // 경계선 둥근 처리
  transition: border-color 0.3s; // 경계선 색상 변경 애니메이션

  &:focus {
    border-color: ${(props) =>
      props.theme.colors.primary}; // 포커스 시 경계선 색상 변경
    outline: none; // 기본 아웃라인 제거
  }

  &:hover {
    border-color: ${(props) =>
      props.theme.colors.primary}; // 호버 시 경계선 색상 변경
  }
`;

export default Input;
