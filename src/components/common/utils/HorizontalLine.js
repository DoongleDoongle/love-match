import styled from "styled-components";

const HorizontalLine = styled.div`
  width: 100%;
  height: ${({ height }) => height || "1px"};
  background-color: ${({ color }) => color || "#ccc"};
  margin: ${({ margin }) => margin || "0"};
  /* border: ${({ height, lineStyle, color }) =>
    `${height || "1px"} ${lineStyle || "solid"} ${color || "#ccc"}`}; */
`;

export default HorizontalLine;
