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
    const updateData = {
      ...(choices.length > 0 && {
        [table.ROOMS_PARTICIPANTS.columns.CHOICE_IDS]: choices.map(
          (choice) => choice.id
        ),
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
