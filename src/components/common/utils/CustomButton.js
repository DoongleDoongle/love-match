import styled from "styled-components";
import PropTypes from "prop-types";

// prettier-ignore
const CustomButton = styled.button`
  background-color: ${({theme, backgroundcolor}) => backgroundcolor || theme.colors.primary};
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
        .normal};
  box-shadow: ${({theme}) => theme.shadows.light};

  &:hover {
    background-color: ${({theme, hoverBackgroundcolor}) => hoverBackgroundcolor || theme.colors.secondary};
    box-shadow: ${({theme}) => theme.shadows.medium};
    transition: 0.2s;
    transform: translateY(1.5px); 
  }

  &:active {
    box-shadow: ${({theme}) => theme.shadows.heavy};
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
  }
`;

CustomButton.propTypes = {
  backgroundcolor: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  hoverBackgroundcolor: PropTypes.string,
};

export default CustomButton;
