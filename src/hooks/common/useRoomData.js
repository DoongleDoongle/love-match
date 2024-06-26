import { useState, useEffect } from "react";
import {
  fetchChoices,
  fetchRoom,
  fetchRoomsParticipants,
  addParticipantInRoom,
  fetchPlatform,
  fetchParticipantsByRoomId,
} from "apis/queries";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * 선택지 데이터를 Supabase 테이블로 관리할 때 사용하던 조합 함수
 * @param {*} choices 선택지 테이블의 데이터 목록
 * @returns [{top: {id, value, imageUrl}, bottom: {id, value, imageUrl}}] 으로 조합된 목록
 */
const createPairedChoices = (choices) => {
  const grouped = choices.reduce((acc, item) => {
    acc[item.group_id] = acc[item.group_id] || [];
    acc[item.group_id].push(item);
    return acc;
  }, {});

  const pairedChoices = Object.values(grouped).map((group) => ({
    top: {
      id: group[0].id,
      value: group[0].choice,
      imageUrl: group[0].image_url,
    },
    bottom: {
      id: group[1].id,
      value: group[1].choice,
      imageUrl: group[1].image_url,
    },
  }));

  return pairedChoices;
};

const _goTo = (navigate, platformName) => {
  alert("사용자 등록에 실패했습니다.");
  navigate(`/${platformName}`);
};

export const useRoomData = (roomId, participantId, platformName) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keywords, setKeywords] = useState([{ top: {}, bottom: {} }]);
  const [keywordIdx, setKeywordIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const createParticipant = async () => {
      const nickname = prompt("이름을 입력하세요:");
      const { participants, error: participantsError } =
        await fetchParticipantsByRoomId(roomId);

      if (participantsError) return _goTo(navigate, platformName);

      const participantNicknames = participants.map(({ nickname }) => nickname);
      if (participantNicknames.includes(nickname)) {
        alert("같은 이름의 플레이어가 존재합니다.\n다른 이름을 사용해주세요.");
        return createParticipant();
      }

      if (nickname) {
        const { participant, error: participantError } =
          await addParticipantInRoom(roomId, nickname);
        if (participantError) {
          _goTo(navigate, platformName);
          return;
        }
        navigate(`${location.pathname}?participantId=${participant.id}`);
      } else {
        _goTo(navigate, platformName);
      }
    };

    const fetchData = async () => {
      try {
        const { room, error: roomError } = await fetchRoom(roomId);
        if (roomError || !room) {
          alert("존재하지 않는 방입니다.");
          navigate(`/${platformName}`);
          return;
        }

        const { roomsParticipants, error: roomsParticipantsError } =
          await fetchRoomsParticipants(roomId, participantId);
        if (roomsParticipantsError || roomsParticipants?.length === 0) {
          alert("잘못된 사용자입니다.");
          navigate(`/${platformName}`);
          return;
        }

        const { platform, error: platformError } = await fetchPlatform(
          platformName
        );
        if (platformError) {
          alert("존재하지 않는 서비스입니다.");
          navigate(`/${platformName}`);
          return;
        }

        const { choices, error: choicesError } = await fetchChoices(
          platform.id
        );
        if (!choicesError) {
          setKeywords(createPairedChoices(choices)); //.splice(0, 7)
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false); // 데이터 로드 완료
      }
    };

    if (!participantId) {
      createParticipant();
    } else {
      fetchData();
    }
  }, [roomId, participantId, navigate, location.pathname, platformName]);

  return { keywords, keywordIdx, setKeywordIdx, isLoading, error };
};
