import { ENTITIES_KEYS } from "../enums/entity-keys";

export const mockData = ()  => [
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
];

export const mockSubItemData = ()  => [
  { id: "1", subItemName: "Item 1" },
  { id: "2", subItemName: "Item 2" },
];


export const mockDataWithSubitem = ()  => [
  { id: "1", name: "Item 1", [ENTITIES_KEYS.MOCK_DATA_SUBITEM]: mockSubItemData() },
  { id: "2", name: "Item 2", [ENTITIES_KEYS.MOCK_DATA_SUBITEM]: mockSubItemData() },
];
