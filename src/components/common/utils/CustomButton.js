import styled from "styled-components";
import PropTypes from "prop-types";

// prettier-ignore
const CustomButton = styled.button`
  background-color: ${({ theme, backgroundcolor }) => backgroundcolor || theme.colors.secondary};
  color: ${({ theme, color }) => color || theme.colors.background};
  margin: ${({ theme, margin }) => margin || 0};
  padding: ${({ theme, padding }) => padding || theme.spacings.small} ${({ theme }) => theme.spacings.base};
  font-size: ${({ theme, fontSize }) => fontSize || theme.fontSizes.base};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  display: block;
  width: ${({ width }) => width || "100%"};
  text-align: center;
  transition: background-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.normal};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ theme, hoverbackgroundcolor }) => hoverbackgroundcolor || theme.colors.secondary};
    color: ${({ theme, color }) => color || theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    transition: 0.2s;
    transform: translateY(1.5px); 
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.heavy};
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
  }
`;

const ButtonComponent = ({ onClick, ...props }) => {
  return <CustomButton onClick={onClick} {...props} />;
};

ButtonComponent.propTypes = {
  backgroundcolor: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  hoverbackgroundcolor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ButtonComponent.defaultProps = {
  backgroundcolor: null,
  color: null,
  padding: null,
  fontSize: null,
  width: null,
  hoverbackgroundcolor: null,
  onClick: () => console.log("CustomButton이 클릭되었습니다."),
};

export default ButtonComponent;
