import supabase from "configs/db/supabaseClient";

export const fetchChoices = async () => {
  const { data: choices, error } = await supabase.from("choices").select("*");

  if (error) {
    console.error("Fetch choices error:", error);
    return { error };
  }

  return { choices };
};
