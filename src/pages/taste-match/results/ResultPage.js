import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useRoomsResultsData } from "hooks/common/useRoomsResultsData";

import ResultLoadedPage from "./ResultLoadedPage";
import ResultNotLoadedPage from "./ResultNotLoadedPage";

const ResultPage = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const participantId = parseInt(searchParams.get("participantId"));
  const { allParticipants, participants } = useRoomsResultsData(
    roomId,
    participantId
  );

  const [participant, setParticipant] = useState({});

  useEffect(() => {
    if (participants.length === 1) {
      setParticipant({ ...participants[0] });
    }
  }, [participants]);

  return isLoaded(participants) ? (
    <ResultLoadedPage
      allParticipants={allParticipants}
      participants={participants}
    />
  ) : (
    <ResultNotLoadedPage participant={participant} />
  );
};

const isLoaded = (participants) => {
  return participants.length > 1;
};

export default ResultPage;
