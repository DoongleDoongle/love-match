import styled from "styled-components";
import LikesContainer from "./LikesContainer";
import LikesTitle from "./LikesTitle";
import LikesAnswer from "./LikesAnswer";

const LikesDescription = styled.div``;

const ListView = styled.div`
  display: flex;
  overflow-x: auto;
  padding: ${({ padding }) => `0 0 ${padding} 0`};
  width: 100%;
  height: ${({ height, padding }) =>
    `calc(${height} + ${padding})`}; // 원하는 높이 설정
  white-space: nowrap; // 카드들이 한 줄로 표시되도록 설정
`;

const Card = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ height }) =>
    height}; // 정사각형을 유지하기 위해 width를 height와 동일하게 설정
  height: ${({ height }) => height};
  margin-right: 10px; // 카드 사이의 간격 설정
  vertical-align: top;
  background-color: #f0f0f0; // 배경색을 추가하여 카드의 경계를 확인
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  flex: 0 0 auto; // 카드가 flexbox 내에서 자동으로 확장되지 않도록 설정
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius};
  object-fit: cover; // 이미지가 카드 크기에 맞게 조정되도록 설정
  filter: ${({ isActive }) => (isActive ? "none" : "brightness(50%)")};
`;

const RightTextOverlay = styled.div`
  position: absolute;
  bottom: ${({ isFirst }) =>
    isFirst ? "50px" : "10px"}; // 이미지의 하단에서 텍스트가 약간 떨어지게 설정
  right: 10px; // 이미지의 우측에서 텍스트가 약간 떨어지게 설정
  background: ${({ isSelected }) =>
    isSelected ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.6)"};
  border: ${({ theme, isSelected }) =>
    isSelected ? `1px solid ${theme.colors.secondary}` : ""};
  border-radius: 4px;
  color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.colors.primary
      : "rgba(255, 255, 255, 0.5)"}; // 텍스트 색상
  padding: 5px;
  z-index: 1; // 텍스트가 이미지 위에 표시되도록 설정
  text-decoration: ${({ isSelected }) =>
    isSelected ? "none" : "line-through"};
`;

const CompatibilityWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: end;
  width: 100%;
  padding-right: 10px;
`;

const CompatibilityRate = styled.div`
  margin-left: 5px;
`;

const LikesContents = ({
  title,
  description,
  choices,
  matchScore,
  height = "150px",
  borderRadius = "12px",
  padding = "20px",
}) => {
  return (
    <LikesContainer>
      <LikesTitle>{title}</LikesTitle>
      <LikesDescription>
        {matchScore === "0%"
          ? `"저런.. 없군요.. 밥은 따로 먹는걸루!"`
          : description}
      </LikesDescription>

      <ListView height={height} padding={padding}>
        {choices.map(([firstChoice, secondChoice], idx) => {
          const selectedChoice = firstChoice.isSelected
            ? firstChoice
            : secondChoice;

          return (
            <Card key={idx} height={height} borderRadius={borderRadius}>
              <Image
                src={selectedChoice.imageUrl}
                alt={`Card ${idx}`}
                borderRadius={borderRadius}
                isActive={selectedChoice.isSelected}
              />
              <RightTextOverlay
                isFirst={true}
                isSelected={firstChoice.isSelected}
              >
                {firstChoice.choice}
              </RightTextOverlay>
              <RightTextOverlay
                isFirst={false}
                isSelected={secondChoice.isSelected}
              >
                {secondChoice.choice}
              </RightTextOverlay>
            </Card>
          );
        })}
      </ListView>

      {matchScore === undefined ? (
        "" // 나만 선택한 첫 화면에서는 궁합도를 노출하지 않는다. (ex: 내가 좋아하는 음식..)
      ) : (
        <CompatibilityWrapper>
          궁합도: <CompatibilityRate>{matchScore}</CompatibilityRate>
        </CompatibilityWrapper>
      )}
    </LikesContainer>
  );
};

export default LikesContents;
