import styled from "styled-components";

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 70%;
  color: ${({ theme }) => theme.colors.primary};
`;

export default LikesContainer;
