import {
  someItems,
  drinkPartyItems,
} from "apis/origin-data/ice-breaking-game/random-topic/items";

export default class ItemFactory {
  static getItemByPlatformId(platformId) {
    switch (platformId) {
      case "1": // 썸
        return someItems;
      case "2": // 술
        return drinkPartyItems;
      default:
        return {};
    }
  }
}
