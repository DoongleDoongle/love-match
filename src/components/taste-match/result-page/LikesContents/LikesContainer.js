import styled from "styled-components";

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.colors.primary};

  overflow-wrap: break-word; // 텍스트가 넘칠 때 줄바꿈을 허용
  white-space: normal; // 연속된 공백을 단일 공백으로 처리하고, 텍스트 줄바꿈을 허용
`;

export default LikesContainer;
