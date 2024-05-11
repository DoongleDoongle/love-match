import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";

export const fetchRoomsParticipants = async (participantId, roomId) => {
  // 필수 파라미터 검사
  if (!participantId || !roomId) {
    const msg = "Missing parameter: participantId and roomId are required.";
    console.error(msg);
    return { error: new Error(msg) };
  }

  try {
    const { data: roomsParticipants, error } = await supabase
      .from(table.ROOMS_PARTICIPANTS.name)
      .select("*")
      .eq(table.ROOMS_PARTICIPANTS.columns.ROOM_ID, roomId)
      .eq(table.ROOMS_PARTICIPANTS.columns.PARTICIPANT_ID, participantId);

    if (error) {
      throw error;
    }

    return { roomsParticipants };
  } catch (error) {
    console.error("Fetch roomsParticipants error:", error);
    return { error };
  }
};

export const createRoomParticipant = async (
  roomId,
  participantId,
  choices = []
) => {
  try {
    const insertData = {
      [table.ROOMS_PARTICIPANTS.columns.ROOM_ID]: roomId,
      [table.ROOMS_PARTICIPANTS.columns.PARTICIPANT_ID]: participantId,
      ...(choices.length > 0 && {
        [table.ROOMS_PARTICIPANTS.columns.CHOICES]: choices,
      }),
    };

    const { data: roomParticipant, error } = await supabase
      .from(table.ROOMS_PARTICIPANTS.name)
      .insert([insertData])
      .single()
      .select();

    if (error) throw error;
    return roomParticipant;
  } catch (error) {
    console.error("Error adding roomParticipant:", error);
    return { error };
  }
};
