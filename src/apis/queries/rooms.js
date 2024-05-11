import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";
import { createParticipant } from "./participants";
import { createRoomParticipant } from "./rooms_participants";

export const fetchRooms = async (roomId) => {
  let query = supabase.from(table.ROOMS.name).select("*");
  if (roomId) {
    query = query.eq(table.ROOMS.columns.ID, roomId);
  }

  const { data: rooms, error } = await query;

  if (error) {
    console.error("Fetch rooms error:", error);
    return { error };
  }

  return { rooms };
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
