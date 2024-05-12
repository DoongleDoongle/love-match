import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useRoomsResultsData } from "hooks/common/useRoomsResultsData";

import ResultLoadedPage from "./ResultLoadedPage";
import ResultNotLoadedPage from "./ResultNotLoadedPage";

const ResultPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const participantId = searchParams.get("participantId");
  const { participants } = useRoomsResultsData(roomId);

  return isLoaded(participants) ? (
    <ResultLoadedPage participants={participants} />
  ) : (
    <ResultNotLoadedPage />
  );
};

const isLoaded = (participants) => {
  return participants.length > 1;
};

export default ResultPage;
