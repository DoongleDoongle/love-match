import styled from "styled-components";

// prettier-ignore
const Button = styled.button`
  background-color: ${({theme, backgroundColor}) => backgroundColor || theme.colors.primary};
  color: ${({theme, color}) => color || theme.colors.light};
  padding: ${({theme, padding}) => padding || theme.spacings.small} ${({theme}) => theme.spacings.base};
  font-size: ${({theme, fontSize}) => fontSize || theme.fontSizes.base};
  border: none;
  border-radius: ${({theme}) => theme.borderRadius.base};
  cursor: pointer;
  display: block;
  width: ${({theme, width}) => width || "100%"};
  text-align: center;
  transition: background-color ${({theme}) => theme.transitions.normal},
    box-shadow ${({theme}) => theme.transitions.normal},
    transform ${({theme}) =>
      theme.transitions
        .normal}; // 속도를 'normal'로 변경하여 부드러움 증가
  box-shadow: ${({theme}) => theme.shadows.light};

  &:hover {
    background-color: ${({theme, hoverBackgroundColor}) => hoverBackgroundColor || theme.colors.secondary};
    box-shadow: ${({theme}) => theme.shadows.medium};
    transition: 0.2s;
    transform: translateY(1.5px); 
  }

  &:active {
    box-shadow: ${({theme}) => theme.shadows.heavy};
    transform: translateY(1px); // 이동 거리와 방향을 조정
  }

  &:focus {
    outline: none; // 포커스 아웃라인 제거
  }

`;

export default Button;
