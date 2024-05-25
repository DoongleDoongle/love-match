import styled from "styled-components";

const Image = styled.img`
  width: ${({ width }) => width || "100%"}; // 너비를 부모 컨테이너에 맞춤
  height: ${({ height }) => height || "auto"};
  object-fit: ${({ objectFit }) =>
    objectFit || "cover"}; // 이미지가 압축되지 않고 영역을 덮도록 함
  object-position: ${({ objectPosition }) =>
    objectPosition || "center"}; // 이미지를 중앙으로 정렬하여 상하단을 잘라냄
  display: block; // 이미지를 블록 요소로 만듬
`;

export default Image;
