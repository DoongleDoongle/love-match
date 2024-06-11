import styled from "styled-components";
import { Progress } from "rsuite"; // 가이드: https://rsuitejs.com/components/progress/

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; // 남은 공간을 모두 채움
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.header.height})`};
`;

const TextArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.huge};
  font-weight: bolder;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  cursor: pointer;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : "none"};
  background-color: ${({ active, theme, imageUrl }) =>
    imageUrl
      ? "none" // 이미지가 있으면 배경색을 투명하게 처리
      : active
      ? theme.colors.secondary
      : theme.colors.background}; // 클릭 시 배경색 변경
  background-size: cover; // 배경 이미지를 컨테이너에 맞춤
  background-position: center; // 배경 이미지를 중앙에 위치
  color: ${({ active, theme }) =>
    active
      ? theme.colors.primary
      : theme.colors.primary}; // 클릭 시 텍스트 색상 변경
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
    background-image 0.3s ease-in-out;
`;

const TextWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5); // 텍스트 배경색 하얀색으로 설정
  padding: 0.5em 1em; // 내부 여백 추가
  width: 100%;
  height: 100%;
`;

export const ChoiceArea = ({ imageUrl, active, theme, children, onClick }) => (
  <TextArea imageUrl={imageUrl} active={active} theme={theme} onClick={onClick}>
    {imageUrl ? <TextWrapper theme={theme}>{children}</TextWrapper> : children}
  </TextArea>
);

export const VersusText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const HalfProgress = styled(Progress.Line)`
  width: 50%;
`;
