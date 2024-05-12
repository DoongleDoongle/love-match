export const $ROOM_ID_PATH = ":roomId";

export const ROOMS_PATH = "rooms";
export const RESULTS_PATH = "results";

export const TASTE_MATCH_ROOT_PATH = "/taste-match";
export const TASTE_MATCH_ROOMS_PATH = `${TASTE_MATCH_ROOT_PATH}/${ROOMS_PATH}`;
export const TASTE_MATCH_RESULTS_PATH = `${TASTE_MATCH_ROOMS_PATH}/${$ROOM_ID_PATH}/${RESULTS_PATH}`;
