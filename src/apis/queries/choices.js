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
  // 1단계: 플랫폼 이름으로 플랫폼 ID 조회
  const { data: platform, error: platformError } = await supabase
    .from(table.PLATFORMS.name)
    .select(`${table.PLATFORMS.columns.ID}`)
    .eq(`${table.PLATFORMS.columns.NAME}`, platformName)
    .single(); // 단일 레코드만 조회

  if (platformError) {
    console.error("플랫폼 조회 오류:", platformError);
    return { error: platformError };
  }

  if (!platform) {
    console.error("해당 이름의 플랫폼을 찾을 수 없습니다:", platformName);
    return { error: new Error("해당 이름의 플랫폼을 찾을 수 없습니다") };
  }

  // 2단계: 조회한 플랫폼 ID로 choices 데이터 조회
  const { data: choicesData, error: choicesError } = await supabase
    .from(table.CHOICES.name)
    .select("*")
    .eq(table.CHOICES.columns.PLATFORM_ID, platform.id);

  if (choicesError) {
    console.error("Choices 조회 오류:", choicesError);
    return { error: choicesError };
  }

  if (!choicesData || choicesData.length === 0) {
    console.error(
      "플랫폼 ID에 해당하는 choices를 찾을 수 없습니다:",
      platform.id
    );
    return {
      error: new Error("플랫폼 ID에 해당하는 choices를 찾을 수 없습니다"),
    };
  }

  return { choices: choicesData };
};
