import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";
import { createParticipant } from "./participants";

export const fetchRoomsParticipants = async (roomId, participantId) => {
  // 필수 파라미터 검사
  if (!roomId) {
    const msg = "Missing parameter: roomId is required.";
    console.error(msg);
    return { error: new Error(msg) };
  }

  try {
    let query = supabase
      .from(table.ROOMS_PARTICIPANTS.name)
      .select("*")
      .eq(table.ROOMS_PARTICIPANTS.columns.ROOM_ID, roomId);

    // participantId가 제공된 경우에만 쿼리에 추가
    if (participantId) {
      query = query.eq(
        table.ROOMS_PARTICIPANTS.columns.PARTICIPANT_ID,
        participantId
      );
    }

    const { data: roomsParticipants, error } = await query;

    if (error) {
      throw error;
    }

    return { roomsParticipants };
  } catch (error) {
    console.error("Fetch roomsParticipants error:", error);
    return { error };
  }
};

export const addParticipantInRoom = async (roomId, nickname) => {
  const { participant, error: participantError } = await createParticipant(
    nickname
  );
  if (participantError) {
    console.error("Error creating participant:", participantError);
    return { error: participantError };
  }

  const { roomParticipant, error: roomParticipantError } =
    await createRoomParticipant(roomId, participant.id);
  if (roomParticipantError) {
    console.error("Error creating roomParticipantError:", roomParticipantError);
    return { error: roomParticipantError };
  }

  return { roomParticipant, participant };
};

export const createRoomParticipant = async (roomId, participantId) => {
  const { data: roomParticipant, error } = await supabase
    .from(table.ROOMS_PARTICIPANTS.name)
    .insert([
      {
        [table.ROOMS_PARTICIPANTS.columns.ROOM_ID]: roomId,
        [table.ROOMS_PARTICIPANTS.columns.PARTICIPANT_ID]: participantId,
      },
    ])
    .single()
    .select();

  if (error) {
    console.error("Error craeting roomParticipant:", error);
    return { error };
  }
  return roomParticipant;
};

export const updateSelectedChoices = async (
  roomId,
  participantId,
  choices = []
) => {
  try {
    // 1. choices 배열에서 각 choice의 id를 추출하여 배열을 만듭니다.
    const choiceIds = choices.map((choice) => choice.id);

    // 2. 중복된 id를 제거하여 유일한 id들로 구성된 배열을 만듭니다.
    const uniqueChoiceIds = Array.from(new Set(choiceIds));

    // 3. choices 배열에 요소가 있는지 확인합니다.
    const hasChoices = choices.length > 0;

    // 4. 조건에 따라 updateData 객체를 만듭니다.
    const updateData = {
      ...(hasChoices && {
        [table.ROOMS_PARTICIPANTS.columns.CHOICE_IDS]: uniqueChoiceIds,
      }),
    };

    const { data: roomParticipant, error } = await supabase
      .from(table.ROOMS_PARTICIPANTS.name)
      .update(updateData)
      .match({
        [table.ROOMS_PARTICIPANTS.columns.ROOM_ID]: roomId,
        [table.ROOMS_PARTICIPANTS.columns.PARTICIPANT_ID]: participantId,
      });

    if (error) throw error;
    return { roomParticipant };
  } catch (error) {
    console.error("Error updating choices of rooms_participants table:", error);
    return { error };
  }
};
