import { useState, useEffect } from "react";
import { fetchChoices, fetchRooms, fetchRoomsParticipants } from "apis/queries";

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

export const useRoomData = (platformUri, roomId, participantId, navigate) => {
  const [keywords, setKeywords] = useState([{ top: "", bottom: "" }]);
  const [keywordIdx, setKeywordIdx] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { rooms, error: roomsError } = await fetchRooms(roomId);
      if (roomsError || rooms?.length === 0) {
        alert("존재하지 않는 방입니다.");
        navigate(platformUri);
        return;
      }

      const { roomsParticipants, error: participantsError } =
        await fetchRoomsParticipants(participantId, roomId);
      if (participantsError || roomsParticipants?.length === 0) {
        alert("잘못된 사용자입니다.");
        navigate(platformUri);
      }

      const { choices, error: choicesError } = await fetchChoices();
      if (!choicesError) {
        setKeywords(createPairedChoices(choices).slice(0, 7));
      }
    };

    fetchData();
  }, [platformUri, roomId, participantId, navigate]);

  return { keywords, keywordIdx, setKeywordIdx, selected, setSelected };
};
