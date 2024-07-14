import { someItems } from "apis/origin-data/ice-breaking-game/random-topic/items";

export default class ItemFactory {
  static getItemByPlatformId(platformId) {
    switch (platformId) {
      case "1":
        return someItems;
      default:
        return {};
    }
  }
}
