import styled from "styled-components";
import Button from "components/common/utils/Button";
import theme from "styles/theme";

const ButtonWraper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
`;

const ResultBottomButtonGroup = () => {
  return (
    <ButtonWraper>
      <Button width="40%" backgroundColor={theme.colors.lightBlueGrey}>
        다시하기
      </Button>
      <Button width="40%" backgroundColor={theme.colors.lightBlueGrey}>
        새 게임
      </Button>
    </ButtonWraper>
  );
};

export default ResultBottomButtonGroup;
