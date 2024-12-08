import { ENTITIES_KEYS } from "../enums/entity-keys";
import mockSalaData from "./data-salas";
import mockCategoriaSalaData from "./data-categoria-sala";
import { fakeUsersGenerator } from "./data-users";
import { mockData, mockDataWithSubitem } from "./mockData";
import { mockReservas } from "./data-reserva-sala";

export const dataMap: { [key: string]: () => Promise<unknown[]> | unknown[] } =
  {
    [ENTITIES_KEYS.SALA]: mockSalaData,
    [ENTITIES_KEYS.CATEGORIA_SALA]: mockCategoriaSalaData,
    [ENTITIES_KEYS.ASIENTOS]: mockSalaData,
    [ENTITIES_KEYS.USERS]: fakeUsersGenerator,
    [ENTITIES_KEYS.MOCK_DATA]: mockData,
    [ENTITIES_KEYS.MOCK_DATA_SUBITEM]: mockDataWithSubitem,
    [ENTITIES_KEYS.RESERVA_SALA]: mockReservas,
  };
