import styled, { keyframes } from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  position: relative;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100px;
`;

export const Title = styled.div`
  color: ${({ theme, color }) => color || theme.colors.secondary};
  font-weight: ${({ fontWeight }) => fontWeight || "none"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
`;

export const Topic = styled.div`
  margin: 10px 0;
  padding: 0 0 2px 0;
  color: ${({ theme, color }) => color || theme.colors.primary};
  font-weight: bold;
  width: 90%;
  text-align: center;
  border-bottom: dotted 1px black;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  font-family: "Poor Story";
  font-size: 24px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  border: solid 1px black;
  border-radius: 4px;
  padding: 10px;
  margin: 2px 0;
  background-color: ${({ isChecked }) => (isChecked ? "black" : "white")};
  color: ${({ isChecked }) => (isChecked ? "darkgray" : "black")};
  text-decoration: ${({ isChecked }) => (isChecked ? "line-through" : "none")};
  transition: transform 0.5s ease-in-out;
  cursor: pointer;
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

export const Ripple = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  animation: ${ripple} 1s linear;
  pointer-events: none;
  width: 50px;
  height: 50px;
`;
