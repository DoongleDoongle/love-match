import styled from "styled-components";
import CustomButton from "components/common/utils/CustomButton";
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
      <CustomButton width="40%" backgroundcolor={theme.colors.lightBlueGrey}>
        다시하기
      </CustomButton>
      <CustomButton width="40%" backgroundcolor={theme.colors.lightBlueGrey}>
        새 게임
      </CustomButton>
    </ButtonWraper>
  );
};

export default ResultBottomButtonGroup;
