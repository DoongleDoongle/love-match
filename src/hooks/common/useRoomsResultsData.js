import { useState, useEffect } from "react";
import { fetchParticipants, fetchRoomsParticipants } from "apis/queries";
import { useNavigate } from "react-router-dom";

import { TASTE_MATCH_ROOT_PATH } from "configs/route/routeConfig";

export const useRoomsResultsData = (roomId) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { roomsParticipants, error: roomsParticipantsError } =
        await fetchRoomsParticipants(roomId);
      if (roomsParticipantsError || roomsParticipants?.length === 0) {
        alert("잘못된 사용자입니다.");
        navigate(TASTE_MATCH_ROOT_PATH);
        return;
      }

      const doneRoomsParticipants = roomsParticipants.filter(
        (el) => el.choices.length > 0
      );
      const doneParticipantIds = doneRoomsParticipants.map(
        (el) => el.participant_id
      );

      const { participants, error: participantsError } =
        await fetchParticipants(doneParticipantIds);
      if (!participantsError) {
        setParticipants(
          convertToParticipants(doneRoomsParticipants, participants)
        );
      }
    };

    fetchData();
  }, [roomId, navigate]);

  return { participants };
};

const convertToParticipants = (roomsParticipants, participants) => {
  const keyValueParticipants = participants.reduce((acc, { id, nickname }) => {
    return { ...acc, [id]: nickname };
  }, {});

  return roomsParticipants.map(
    ({ participant_id: myId, choices: myChoices }) => {
      const partnerParticipants = roomsParticipants.filter(
        ({ participant_id }) => myId !== participant_id
      );

      return {
        nickname: keyValueParticipants[myId],
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
