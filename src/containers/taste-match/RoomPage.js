import "rsuite/dist/rsuite.min.css";
import theme from "styles/theme";

import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRoomData } from "hooks/common/useRoomData";
import {
  Container,
  TextArea,
  ProgressContainer,
  HalfProgress,
  VersusText,
} from "components/taste-match/room-page";

import {
  TASTE_MATCH_ROOT,
  TASTE_MATCH_RESULTS,
} from "configs/route/routeConfig";

const RoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const participantId = searchParams.get("participantId");

  const { keywords, keywordIdx, setKeywordIdx, selected, setSelected } =
    useRoomData(TASTE_MATCH_ROOT, roomId, participantId, navigate);

  const clickTextArea = (type) => {
    setSelected(type);
    if (keywordIdx + 1 < keywords.length) {
      setTimeout(() => {
        setKeywordIdx(keywordIdx + 1);
        setSelected(null);
      }, 250);
    } else {
      navigate(TASTE_MATCH_RESULTS);
    }
  };

  const currentKeyword = keywords[keywordIdx];
  const leftProgressPercentage = (keywordIdx / keywords.length) * 200;
  const rightProgressPercentage =
    leftProgressPercentage > 100 ? leftProgressPercentage - 100 : 0;

  return (
    <Container>
      <TextArea
        onClick={() => clickTextArea("top")}
        active={selected === "top"}
      >
        {currentKeyword.top}
      </TextArea>

      <ProgressContainer>
        <HalfProgress
          percent={leftProgressPercentage}
          strokeColor={theme.colors.primary}
          showInfo={false}
          strokeWidth={10}
        />
        <VersusText>VS</VersusText>
        <HalfProgress
          percent={rightProgressPercentage}
          strokeColor={theme.colors.primary}
          showInfo={false}
          strokeWidth={10}
        />
      </ProgressContainer>
      <TextArea
        onClick={() => clickTextArea("bottom")}
        active={selected === "bottom"}
      >
        {currentKeyword.bottom}
      </TextArea>
    </Container>
  );
};

export default RoomPage;
