import { useState, useEffect } from "react";
import { fetchParticipants, fetchRoomsParticipants } from "apis/queries";
import { useNavigate } from "react-router-dom";

import { TASTE_MATCH_ROOT_PATH } from "configs/route/routeConfig";

const _goTo = (navigate, toUrl) => {
  alert("잘못된 사용자입니다.");
  navigate(toUrl);
};

export const useRoomsResultsData = (roomId, myId) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { roomsParticipants, error: roomsParticipantsError } =
        await fetchRoomsParticipants(roomId);
      if (roomsParticipantsError || roomsParticipants?.length === 0) {
        _goTo(navigate, TASTE_MATCH_ROOT_PATH);
        return;
      }

      const doneRoomsParticipants = roomsParticipants.filter(
        (el) => el.choices.length > 0
      );
      const doneParticipantIds = doneRoomsParticipants.map(
        (el) => el.participant_id
      );

      if (!doneParticipantIds.includes(myId)) {
        _goTo(navigate, TASTE_MATCH_ROOT_PATH);
        return;
      }

      const { participants, error: participantsError } =
        await fetchParticipants(doneParticipantIds);
      if (!participantsError) {
        setParticipants(
          convertToParticipants(doneRoomsParticipants, participants, myId)
        );
      }
    };

    fetchData();
  }, [roomId, myId, navigate]);

  return { participants };
};

const convertToParticipants = (doneRoomsParticipants, participants, myId) => {
  const keyValueParticipants = participants.reduce((acc, { id, nickname }) => {
    return { ...acc, [id]: nickname };
  }, {});

  // 본인을 가장 앞순서에 배치.
  const sortedRoomsParticipants = doneRoomsParticipants.reduce((acc, cur) => {
    if (cur.participant_id === myId) return [cur, ...acc];
    return [...acc, cur];
  }, []);

  return sortedRoomsParticipants.map(
    ({ participant_id: currentId, choices: myChoices }) => {
      const partnerParticipants = sortedRoomsParticipants.filter(
        ({ participant_id }) => currentId !== participant_id
      );

      return {
        nickname: keyValueParticipants[currentId],
        myMenus: myChoices,
        compatibilities: createCompatibilities(
          partnerParticipants,
          keyValueParticipants,
          myChoices
        ),
      };
    }
  );
};

const createCompatibilities = (
  partnerParticipants,
  keyValueParticipants,
  myChoices
) => {
  return partnerParticipants.map(
    ({ participant_id: partnerId, choices: partnerChoices }) => {
      const togetherLikesMenus = getTogetherLikesMenus(
        partnerChoices,
        myChoices
      );

      return {
        partner: keyValueParticipants[partnerId],
        rate: calculateRate(togetherLikesMenus, myChoices),
        togetherLikesMenus,
      };
    }
  );
};

const getTogetherLikesMenus = (partnerChoices, myChoices) => {
  return partnerChoices.filter((el) => myChoices.includes(el));
};

const calculateRate = (togetherLikesMenus, myChoices) => {
  const percentage = (togetherLikesMenus.length / myChoices.length) * 100;
  return percentage % 1 === 0 ? `${percentage}%` : `${percentage.toFixed(1)}%`;
};
