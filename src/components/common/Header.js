// Header.js
import styled from "styled-components";

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary};
  padding: 16px;
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => props.theme.fontSizes.extraLarge};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export default Header;
