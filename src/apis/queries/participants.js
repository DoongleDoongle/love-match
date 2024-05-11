import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";

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
