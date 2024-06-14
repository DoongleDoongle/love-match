import styled from "styled-components";
import { calculateMainLayoutHeight } from "styles/functions";

const BaseContainer = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "none"};
  flex: 1;
  width: 100%;
  height: ${({ theme }) => calculateMainLayoutHeight(theme)};
  background-color: ${({ theme, backgroundcolor }) =>
    backgroundcolor || theme.colors.background};
`;

export default BaseContainer;
