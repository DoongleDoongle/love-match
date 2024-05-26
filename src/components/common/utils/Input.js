import styled from "styled-components";

const Input = styled.input`
  width: ${({ width }) => width || "100%"};
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: ${({ borderRadius }) => borderRadius || "4px"};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    outline: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default Input;
