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
        const { convertedAllParticipants, convertedParticipants } =
          convertToParticipants(doneRoomsParticipants, participants, myId);
        setAllParticipants(convertedAllParticipants);
        setParticipants(convertedParticipants);
      }
    };

    fetchData();
  }, [roomId, myId, navigate]);

  return { allParticipants, participants };
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

  // 응답 객체 조합해서 반환
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

/**
 * 모든 참가자들이 공통적으로 좋아하는 메뉴와 그 궁합률을 계산하는 함수
 *
 * @param {Array} participants - 참가자들의 배열, 각 참가자는 {choices: Array} 형태를 가짐
 * @returns {Object} - { rate: 궁합률 (백분율로 표현된 문자열), togetherLikesChoices: 공통으로 좋아하는 메뉴의 배열 }
 */
const createAllParticipants = (participants) => {
  // 모든 참가자들의 choices 배열을 수집
  const allChoices = participants.map((p) => p.choices);

  // 모든 참가자들이 공통적으로 선택한 메뉴를 찾음
  const commonChoices = allChoices.reduce((common, choices) => {
    return common.filter((choice) => choices.includes(choice));
  });

  // 모든 참가자가 선택한 메뉴의 수는 동일하므로 첫 번째 참가자의 choices 길이를 사용
  const compatibilityRate = calculateRate(
    commonChoices,
    participants[0].choices
  );

  // 궁합률과 공통으로 좋아하는 메뉴를 반환
  return {
    rate: `${compatibilityRate}%`,
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
