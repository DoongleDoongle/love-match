import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";

export const fetchParticipants = async (participantIds = []) => {
  if (!Array.isArray(participantIds)) {
    const msg = "participantIds 타입은 배열이어야 합니다.";
    console.error(msg);
    return { error: new Error(msg) };
  }

  let query = supabase.from(table.PARTICIPANTS.name).select("*");
  if (participantIds.length > 0) {
    query = query.in(table.PARTICIPANTS.columns.ID, participantIds);
  }

  const { data: participants, error } = await query;

  if (error) {
    console.error("Fetch participants error:", error);
    return { error };
  }

  return { participants };
};

export const fetchParticipant = async (participantId) => {
  if (!participantId) {
    const msg = "Missing parameter: participantId is required.";
    console.error(msg);
    return { error: new Error(msg) };
  }

  const { data: participant, error } = await supabase
    .from(table.PARTICIPANTS.name)
    .select("*")
    .eq(table.PARTICIPANTS.columns.ID, participantId)
    .single();

  if (error) {
    console.error("Fetch participant error:", error);
    return { error };
  }

  return { participant };
};

export const createParticipant = async (nickname) => {
  const { data: participant, error: participantError } = await supabase
    .from(table.PARTICIPANTS.name)
    .insert([
      {
        [table.PARTICIPANTS.columns.NICKNAME]: nickname,
      },
    ])
    .single()
    .select();

  if (participantError) {
    console.error("Error adding participant:", participantError);
    return { error: participantError };
  }

  return { participant };
};
