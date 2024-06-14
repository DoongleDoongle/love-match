import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRoomsResultsData } from "hooks/common/useRoomsResultsData";

import ResultLoadedPage from "./ResultLoadedPage";
import ResultNotLoadedPage from "./ResultNotLoadedPage";
import CustomSpinner from "components/common/CustomSpinner";

const ResultPage = ({ choiceTopic }) => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const participantId = parseInt(searchParams.get("participantId"));
  const { allParticipants, participants, isLoading, error } =
    useRoomsResultsData(roomId, participantId);

  const [participant, setParticipant] = useState({});

  useEffect(() => {
    if (participants.length === 1) {
      setParticipant({ ...participants[0] });
    }
  }, [participants]);

  if (isLoading) {
    return <CustomSpinner />; // 로딩 중일 때 Spinner 표시
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>; // 에러 처리
  }

  return participants.length > 1 ? (
    <ResultLoadedPage
      choiceTopic={choiceTopic}
      allParticipants={allParticipants}
      participants={participants}
    />
  ) : (
    <ResultNotLoadedPage choiceTopic={choiceTopic} participant={participant} />
  );
};

export default ResultPage;
