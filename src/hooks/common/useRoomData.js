import { useState, useEffect } from "react";
import {
  fetchChoices,
  fetchRooms,
  fetchRoomsParticipants,
  addParticipantInRoom,
} from "apis/queries";
import { useNavigate, useLocation } from "react-router-dom";

import { TASTE_MATCH_ROOT_PATH } from "configs/route/routeConfig";

const createPairedChoices = (choices) => {
  const grouped = choices.reduce((acc, item) => {
    acc[item.group_id] = acc[item.group_id] || [];
    acc[item.group_id].push(item.choice);
    return acc;
  }, {});

  return Object.values(grouped).map((group) => ({
    top: group[0],
    bottom: group[1] || "",
  }));
};

export const useRoomData = (roomId, participantId) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keywords, setKeywords] = useState([{ top: "", bottom: "" }]);
  const [keywordIdx, setKeywordIdx] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { rooms, error: roomsError } = await fetchRooms(roomId);
      if (roomsError || rooms?.length === 0) {
        alert("존재하지 않는 방입니다.");
        navigate(TASTE_MATCH_ROOT_PATH);
        return;
      }

      const { roomsParticipants, error: roomsParticipantsError } =
        await fetchRoomsParticipants(roomId, participantId);
      // TODO: 사용자 전부 불러오고 있음.
      // TOOD: 이름 입력해도 결과 화면에서 undefined? 로 나옴.
      if (
        roomsParticipantsError ||
        roomsParticipants?.length === 0 ||
        roomsParticipants?.length > 1
      ) {
        const nickname = prompt("이름을 입력하세요:");
        if (nickname) {
          const { participant, error } = await addParticipantInRoom(
            roomId,
            nickname
          );
          if (error) {
            alert("사용자 등록에 실패했습니다.");
            return;
          }
          navigate(`${location.pathname}?participantId=${participant.id}`);
        }
      }

      const { choices, error: choicesError } = await fetchChoices();
      if (!choicesError) {
        setKeywords(createPairedChoices(choices).slice(0, 7));
      }
    };

    fetchData();
  }, [roomId, participantId, navigate]);

  return { keywords, keywordIdx, setKeywordIdx, selected, setSelected };
};
