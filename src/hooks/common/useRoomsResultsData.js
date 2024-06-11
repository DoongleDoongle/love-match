import { useState, useEffect } from "react";
import { fetchParticipants, fetchRoomsParticipants } from "apis/queries";
import { useNavigate } from "react-router-dom";
import { TASTE_MATCH_ROOT_PATH } from "configs/route/routeConfig";

const _goTo = (navigate, toUrl) => {
  alert("잘못된 사용자입니다.");
  // navigate(toUrl);
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

        const convertedRoomsParticipants = roomsParticipants.map(
          ({ room_id, participant_id, choice_ids }) => {
            return {
              roomId: room_id,
              participantId: participant_id,
              choiceIds: choice_ids,
            };
          }
        );

        // 선택지 테스트를 완료한 참가자 목록
        const doneRoomsParticipants = convertedRoomsParticipants.filter(
          (el) => el.choiceIds.length > 0
        );

        // 선택지 테스트를 완료한 참가자의 아이디 목록
        const doneParticipantIds = doneRoomsParticipants.map(
          (el) => el.participantId
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
    if (cur.participantId === myId) return [cur, ...acc];
    return [...acc, cur];
  }, []);

  return {
    convertedAllParticipants: createAllParticipants(sortedRoomsParticipants),
    convertedParticipants: sortedRoomsParticipants.map(
      ({ participantId: currentId, choiceIds: myChoiceIds }) => {
        const partnerParticipants = sortedRoomsParticipants.filter(
          ({ participantId }) => currentId !== participantId
        );

        return {
          nickname: keyValueParticipants[currentId],
          myChoiceIds,
          compatibilities: createCompatibilities(
            partnerParticipants,
            keyValueParticipants,
            myChoiceIds
          ),
        };
      }
    ),
  };
};

const createAllParticipants = (participants) => {
  const allChoiceIds = participants.map((p) => p.choiceIds);
  const commonChoiceIds = allChoiceIds.reduce((common, choiceIds) => {
    return common.filter((choiceId) => choiceIds.includes(choiceId));
  });

  const compatibilityRate = calculateRate(
    commonChoiceIds,
    participants[0].choiceIds
  );

  return {
    rate: compatibilityRate,
    togetherLikesChoiceIds: commonChoiceIds,
  };
};

const createCompatibilities = (
  partnerParticipants,
  keyValueParticipants,
  myChoiceIds
) => {
  return partnerParticipants.map(
    ({ participantId: partnerId, choiceIds: partnerChoiceIds }) => {
      const togetherLikesChoiceIds = getTogetherLikesChoiceIds(
        partnerChoiceIds,
        myChoiceIds
      );

      return {
        partner: keyValueParticipants[partnerId],
        rate: calculateRate(togetherLikesChoiceIds, myChoiceIds),
        togetherLikesChoiceIds,
      };
    }
  );
};

const getTogetherLikesChoiceIds = (partnerChoiceIds, myChoiceIds) => {
  return partnerChoiceIds.filter((el) => myChoiceIds.includes(el));
};

const calculateRate = (likeChoiceIds, baseChoiceIds) => {
  const percentage = (likeChoiceIds.length / baseChoiceIds.length) * 100;
  return percentage % 1 === 0 ? `${percentage}%` : `${percentage.toFixed(1)}%`;
};
