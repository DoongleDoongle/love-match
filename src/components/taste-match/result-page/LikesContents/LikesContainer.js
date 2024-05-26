import styled from "styled-components";

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 70%;
  color: ${({ theme }) => theme.colors.primary};
`;

export default LikesContainer;
