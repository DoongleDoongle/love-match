import supabase from "configs/supabaseClient";

export const fetchRooms = async (roomId) => {
  let query = supabase.from("rooms").select("*");
  if (roomId) {
    query = query.eq("room_id", roomId);
  }

  const { data: rooms, error } = await query;

  if (error) {
    console.error("Fetch rooms error:", error);
    return { error };
  }

  return { rooms };
};

export const createRoom = async () => {
  const { data: rooms, error } = await supabase
    .from("rooms")
    .insert([{ password: null }]) // password 필드에 NULL 값을 설정
    .select();

  if (error) {
    console.error("Error creating room:", error);
    return { error };
  }

  return { rooms };
};
