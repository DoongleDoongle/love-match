import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";
import { createParticipant } from "./participants";
import { createRoomParticipant } from "./rooms_participants";

export const fetchRoom = async (roomId) => {
  const { data: room, error } = await supabase
    .from(table.ROOMS.name)
    .select("*")
    .eq(table.ROOMS.columns.ID, roomId)
    .single();

  if (error) {
    console.error("Fetch room error:", error);
    return { error };
  }

  return { room };
};

export const createRoom = async () => {
  const { data: room, error } = await supabase
    .from(table.ROOMS.name)
    .insert([{ password: null }])
    .single()
    .select();

  if (error) {
    console.error("Error creating room:", error);
    return { error };
  }

  return { room };
};

/**
 * ROOMS, PARTICIPANTS, ROOMS_PARTICIPANTS 3개 테이블에 모두 데이터 적재
 * @param {*} nickname
 * @returns
 */
export const createRoomAndParticipant = async (nickname) => {
  const { room, error: roomError } = await createRoom();
  if (roomError) return { error: roomError };

  const { participant, error: participantError } = await createParticipant(
    nickname
  );
  if (participantError) return { error: participantError };

  const { error: roomParticipantError } = await createRoomParticipant(
    room.id,
    participant.id
  );
  if (roomParticipantError) return { error: roomParticipantError };

  return { room, participant };
};
