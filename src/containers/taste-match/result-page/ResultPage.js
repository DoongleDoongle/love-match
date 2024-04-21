import React from "react";

import ResultLoadedPage from "./ResultLoadedPage";
import ResultNotLoadedPage from "./ResultNotLoadedPage";

const ResultPage = () => {
  const participants = getParticipants();

  return isLoaded(participants) ? (
    <ResultLoadedPage participants={participants} />
  ) : (
    <ResultNotLoadedPage />
  );
};

const isLoaded = (participants) => {
  return participants.length > 0;
};

const getParticipants = () => {
  return [
    {
      name: "지민",
      compatibilities: [
        {
          partner: "현우",
          rate: "0.8",
          togetherLikesMenus: ["김치찌개", "삼겹살"],
        },
        {
          partner: "서연",
          rate: "0.6",
        },
      ],
    },
    {
      name: "현우",
      compatibilities: [
        {
          partner: "지민",
          rate: "0.8",
        },
        {
          partner: "서연",
          rate: "0.7",
        },
      ],
    },
    {
      name: "서연",
      compatibilities: [
        {
          partner: "지민",
          rate: "0.6",
        },
        {
          partner: "현우",
          rate: "0.7",
        },
      ],
    },
  ];
};

export default ResultPage;
