import styled from "styled-components";

const HorizontalLine = styled.div`
  width: 100%;
  height: 0.1px;
  box-shadow: ${({ height, weight }) =>
    `0 0.${height ? height : 2}px 0px rgba(0, 0, 0, 0.${
      weight ? weight : 2
    })`}; // 하단에 얇은 그림자 생성
  margin: ${({ margin }) => margin || "0"};
`;

export default HorizontalLine;
