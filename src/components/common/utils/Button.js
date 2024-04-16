import styled from "styled-components";

// prettier-ignore
const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light}; // 밝은 텍스트 색상 사용
  padding: ${(props) => props.theme.spacings.small} ${(props) => props.theme.spacings.base};
  font-size: ${(props) => props.theme.fontSizes.base};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.base};
  cursor: pointer;
  display: block;
  width: ${(props) => props.width || "100%"};
  text-align: center;
  transition: background-color ${(props) => props.theme.transitions.normal},
    box-shadow ${(props) => props.theme.transitions.normal},
    transform ${(props) =>
      props.theme.transitions
        .normal}; // 속도를 'normal'로 변경하여 부드러움 증가
  box-shadow: ${(props) => props.theme.shadows.light};

  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    box-shadow: ${(props) => props.theme.shadows.medium};
    transition: 0.2s;
    transform: translateY(-2px); // 이동 거리를 줄여 더 자연스럽게
  }

  &:active {
    box-shadow: ${(props) => props.theme.shadows.heavy};
    transform: translateY(1px); // 이동 거리와 방향을 조정
  }

  &:focus {
    outline: none; // 포커스 아웃라인 제거
  }

  @media (hover: none) {
    &:hover {
      background-color: ${(props) =>
        props.theme.colors
          .primary}; // 호버가 없는 디바이스에서는 배경색 변경 취소
      box-shadow: ${(props) => props.theme.shadows.light};
      transform: none;
    }
  }
`;

export default Button;
