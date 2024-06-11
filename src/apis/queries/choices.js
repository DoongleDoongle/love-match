import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";

export const fetchChoices = async (platformId) => {
  const { data, error } = await supabase
    .from(table.CHOICES.name)
    .select("*")
    .eq(table.CHOICES.columns.PLATFORM_ID, platformId);

  if (error) {
    console.error("Fetch choices error:", error);
    return { error };
  }

  return { choices: data };
};

export const fetchChoicesByPlatformName = async (platformName) => {
  const { data, error } = await supabase
    .from(table.CHOICES.name)
    .select(`*, ${table.PLATFORMS.name}(${table.PLATFORMS.columns.ID})`)
    .eq(
      `${table.PLATFORMS.name}.${table.PLATFORMS.columns.NAME}`,
      platformName
    );

  if (error) {
    console.error("Fetch choices error:", error);
    return { error };
  }

  if (!data || data.length === 0) {
    console.error("No choices found for platform:", platformName);
    return { error: new Error("No choices found for platform") };
  }

  return { choices: data };
};
