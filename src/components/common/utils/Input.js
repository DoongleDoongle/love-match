import styled from "styled-components";

const Input = styled.input`
  width: ${({ width }) => width || "100%"};
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Input;
