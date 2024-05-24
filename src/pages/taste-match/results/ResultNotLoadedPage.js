import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import HorizontalLine from "components/common/utils/HorizontalLine";
import BaseContainer from "components/common/utils/BaseContainer";
import LikesContents from "components/taste-match/result-page/LikesContents/LikesContents";
import ShereMessageForm from "components/taste-match/result-page/ShereMessageForm";
import ResultIconGroup from "components/taste-match/result-page/ResultIconGroup";
import ResultBottomButtonGroup from "components/taste-match/result-page/ResultBottomButtonGroup";

const Message = styled.div`
  margin: 20px 0;
  font-size: ${({ theme }) => theme.fontSizes.semiLarge};
  font-weight: bold;
`;

const ResultNotLoadedPage = ({ participant = {} }) => {
  const location = useLocation();
  const [platformName, setPlatformName] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const roomsIndex = pathParts.indexOf("rooms");
    if (roomsIndex > 0) {
      setPlatformName(pathParts[roomsIndex - 1]);
    }
  }, [location.pathname]);

  return (
    <BaseContainer>
      <LikesContents
        title="내가 좋아하는 음식"
        answer={participant.myMenus?.join(", ")}
      />

      <Message>"오늘은 한식이 끌리는 날이군요 :D"</Message>
      <HorizontalLine />

      <ShereMessageForm />
      <HorizontalLine />

      <ResultIconGroup platformName={platformName} />
      <ResultBottomButtonGroup />
    </BaseContainer>
  );
};

export default ResultNotLoadedPage;
