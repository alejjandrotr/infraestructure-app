import { ENTITIES_KEYS } from "../enums/entity-keys";
import mockSalaData from "./data-salas";
import mcokCategoriaSala from "./data-categoria-asiento";
import mockCategoriaSalaData from "./data-categoria-sala";
import { fakeUsersGenerator } from "./data-users";
import { mockData, mockDataWithSubitem } from "./mockData";

export const dataMap: { [key: string]: () => Promise<unknown[]> | unknown[] } =
  {
    [ENTITIES_KEYS.SALA]: mockSalaData,
    [ENTITIES_KEYS.CATEGORIA_SALA]: mockCategoriaSalaData,
    [ENTITIES_KEYS.ASIENTOS]: mockSalaData,
    [ENTITIES_KEYS.USERS]: fakeUsersGenerator,
    [ENTITIES_KEYS.MOCK_DATA]: mockData,
    [ENTITIES_KEYS.MOCK_DATA_SUBITEM]: mockDataWithSubitem,
  };
