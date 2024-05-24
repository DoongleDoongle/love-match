import supabase from "configs/db/supabaseClient";
import { table } from "configs/db/dbConfig";

export const fetchPlatform = async (platformName) => {
  const { data: platform, error } = await supabase
    .from(table.PLATFORMS.name)
    .select("*")
    .eq(table.PLATFORMS.columns.NAME, platformName)
    .maybeSingle();

  if (error) {
    console.error("Fetch platform error:", error);
    return { error };
  }

  return { platform };
};

export const incrementLikeCount = async (platformName) => {
  try {
    const { data: platform, error } = await supabase
      .rpc("increment_like_count", {
        platform_name: platformName,
      })
      .maybeSingle();

    if (error) {
      console.error("Error updating like count:", error);
      return { error };
    }

    return { platform };
  } catch (error) {
    console.error("Unexpected error updating like count:", error);
    return { error };
  }
};

export const incrementShareCount = async (platformName) => {
  try {
    const { data: platform, error } = await supabase
      .rpc("increment_share_count", {
        platform_name: platformName,
      })
      .maybeSingle();

    if (error) {
      console.error("Error updating share count:", error);
      return { error };
    }

    return { platform };
  } catch (error) {
    console.error("Unexpected error updating share count:", error);
    return { error };
  }
};

export const incrementInviteCount = async (platformName) => {
  try {
    const { data: platform, error } = await supabase
      .rpc("increment_invite_count", {
        platform_name: platformName,
      })
      .maybeSingle();

    if (error) {
      console.error("Error updating invite count:", error);
      return { error };
    }

    return { platform };
  } catch (error) {
    console.error("Unexpected error updating invite count:", error);
    return { error };
  }
};
