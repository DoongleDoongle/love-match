import { useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const replayGame = () => {
    const currentPath = location.pathname;
    const searchParams = location.search;
    const replayPath = currentPath.replace(/\/results$/, "");
    navigate(`${replayPath}${searchParams}`);
  };

  const newGame = () => {
    const currentPath = location.pathname;
    const RootPath = currentPath.split("/rooms")[0];
    navigate(RootPath);
  };

  return (
    <ButtonWraper>
      <CustomButton
        onClick={replayGame}
        width="40%"
        backgroundcolor={theme.colors.lightBlueGrey}
      >
        다시하기
      </CustomButton>
      <CustomButton
        onClick={newGame}
        width="40%"
        backgroundcolor={theme.colors.lightBlueGrey}
      >
        새 게임
      </CustomButton>
    </ButtonWraper>
  );
};

export default ResultBottomButtonGroup;
