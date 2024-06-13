import theme from "styles/theme";

import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useRoomData } from "hooks/common/useRoomData";
import {
  Container,
  ChoiceArea,
  ProgressContainer,
  HalfProgress,
  VersusText,
} from "components/taste-match/room-page";

import { updateSelectedChoices } from "apis/queries";

import {
  TASTE_MATCH_ROOMS_PATH,
  RESULTS_PATH,
} from "configs/route/routeConfig";
import Spinner from "react-bootstrap/Spinner";

const getPlatformName = (location) => {
  const roomsIdx = location.pathname.indexOf("/rooms");
  const platformName = location.pathname
    .substring(0, roomsIdx)
    .replace("/", "");
  return platformName;
};

const RoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const platformName = getPlatformName(location);
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const participantId = searchParams.get("participantId");

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState([]);

  const { keywords, keywordIdx, setKeywordIdx, isLoading, error } = useRoomData(
    roomId,
    participantId,
    platformName
  );

  useEffect(() => {
    if (selectedArea !== null) {
      const timer = setTimeout(async () => {
        const updatedChoices = [
          ...selectedChoices,
          keywords[keywordIdx][selectedArea],
        ];

        setSelectedChoices(updatedChoices);

        if (keywordIdx + 1 < keywords.length) {
          setKeywordIdx(keywordIdx + 1);
          setSelectedArea(null);
        } else {
          await updateSelectedChoices(roomId, participantId, updatedChoices);
          navigate(
            `/${platformName}/rooms/${roomId}/${RESULTS_PATH}?participantId=${participantId}`
          );
        }
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [
    selectedArea,
    keywords,
    keywordIdx,
    participantId,
    selectedChoices,
    roomId,
    setKeywordIdx,
    navigate,
    platformName,
  ]);

  const clickTextArea = (type) => {
    setSelectedArea(type);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" />
      </div>
    ); // 로딩 중일 때 Spinner 표시
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>; // 에러 처리
  }

  const currentKeyword = keywords[keywordIdx];
  const leftProgressPercentage = (keywordIdx / keywords.length) * 200;
  const rightProgressPercentage =
    leftProgressPercentage > 100 ? leftProgressPercentage - 100 : 0;

  return (
    <Container>
      <ChoiceArea
        onClick={() => clickTextArea("top")}
        active={selectedArea === "top"}
        imageUrl={currentKeyword.top.imageUrl}
      >
        {currentKeyword.top.value}
      </ChoiceArea>

      <ProgressContainer>
        <HalfProgress
          percent={leftProgressPercentage}
          strokeColor={theme.colors.secondary}
          showInfo={false}
          strokeWidth={10}
        />
        <VersusText>VS</VersusText>
        <HalfProgress
          percent={rightProgressPercentage}
          strokeColor={theme.colors.secondary}
          showInfo={false}
          strokeWidth={10}
        />
      </ProgressContainer>

      <ChoiceArea
        onClick={() => clickTextArea("bottom")}
        active={selectedArea === "bottom"}
        imageUrl={currentKeyword.bottom.imageUrl}
      >
        {currentKeyword.bottom.value}
      </ChoiceArea>
    </Container>
  );
};

export default RoomPage;
