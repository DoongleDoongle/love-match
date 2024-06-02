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
  const [allParticipants, setAllParticipants] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    let isMounted = true; // 컴포넌트 마운트 상태 추적

    const fetchData = async () => {
      try {
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
        if (participantsError) {
          setError(participantsError);
          return;
        }

        const { convertedAllParticipants, convertedParticipants } =
          convertToParticipants(doneRoomsParticipants, participants, myId);

        if (isMounted) {
          setAllParticipants(convertedAllParticipants);
          setParticipants(convertedParticipants);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 상태 업데이트 방지
    };
  }, [roomId, myId, navigate]);

  return { allParticipants, participants, isLoading, error };
};

const convertToParticipants = (doneRoomsParticipants, participants, myId) => {
  const keyValueParticipants = participants.reduce((acc, { id, nickname }) => {
    return { ...acc, [id]: nickname };
  }, {});

  const sortedRoomsParticipants = doneRoomsParticipants.reduce((acc, cur) => {
    if (cur.participant_id === myId) return [cur, ...acc];
    return [...acc, cur];
  }, []);

  return {
    convertedAllParticipants: createAllParticipants(sortedRoomsParticipants),
    convertedParticipants: sortedRoomsParticipants.map(
      ({ participant_id: currentId, choices: myChoices }) => {
        const partnerParticipants = sortedRoomsParticipants.filter(
          ({ participant_id }) => currentId !== participant_id
        );

        return {
          nickname: keyValueParticipants[currentId],
          myChoices,
          compatibilities: createCompatibilities(
            partnerParticipants,
            keyValueParticipants,
            myChoices
          ),
        };
      }
    ),
  };
};

const createAllParticipants = (participants) => {
  const allChoices = participants.map((p) => p.choices);

  const commonChoices = allChoices.reduce((common, choices) => {
    return common.filter((choice) => choices.includes(choice));
  });

  const compatibilityRate = calculateRate(
    commonChoices,
    participants[0].choices
  );

  return {
    rate: compatibilityRate,
    togetherLikesChoices: commonChoices,
  };
};

const createCompatibilities = (
  partnerParticipants,
  keyValueParticipants,
  myChoices
) => {
  return partnerParticipants.map(
    ({ participant_id: partnerId, choices: partnerChoices }) => {
      const togetherLikesChoices = getTogetherLikesChoices(
        partnerChoices,
        myChoices
      );

      return {
        partner: keyValueParticipants[partnerId],
        rate: calculateRate(togetherLikesChoices, myChoices),
        togetherLikesChoices,
      };
    }
  );
};

const getTogetherLikesChoices = (partnerChoices, myChoices) => {
  return partnerChoices.filter((el) => myChoices.includes(el));
};

const calculateRate = (likeChoices, baseChoices) => {
  const percentage = (likeChoices.length / baseChoices.length) * 100;
  return percentage % 1 === 0 ? `${percentage}%` : `${percentage.toFixed(1)}%`;
};
