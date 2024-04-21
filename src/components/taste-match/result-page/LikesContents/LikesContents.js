import LikesContainer from "./LikesContainer";
import LikesTitle from "./LikesTitle";
import LikesAnswer from "./LikesAnswer";

const LikesContents = ({ title, answer, matchScore }) => {
  return (
    <LikesContainer>
      <LikesTitle>{title}</LikesTitle>
      <LikesAnswer>{answer}</LikesAnswer>
      {matchScore !== undefined ? (
        <LikesAnswer>궁합도: {matchScore * 100}%</LikesAnswer>
      ) : (
        ""
      )}
    </LikesContainer>
  );
};

export default LikesContents;
