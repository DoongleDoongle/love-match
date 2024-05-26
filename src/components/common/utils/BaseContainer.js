import styled from "styled-components";

const BaseContainer = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "none"};
  flex: 1;
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.header.height})`};
  background-color: ${({ theme, backgroundcolor }) =>
    backgroundcolor || theme.colors.background};
`;

export default BaseContainer;
