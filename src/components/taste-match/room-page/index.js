import styled from "styled-components";
import { Progress } from "rsuite"; // 가이드: https://rsuitejs.com/components/progress/

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1; // 남은 공간을 모두 채움
  width: 100%;
`;

export const TextArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.huge};
  font-weight: bolder;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active
      ? theme.colors.secondary
      : theme.colors.background}; // 클릭 시 배경색 변경
  color: ${({ active, theme }) =>
    active
      ? theme.colors.primary
      : theme.colors.primary}; // 클릭 시 텍스트 색상 변경
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

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
