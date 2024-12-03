import { ENTITIES_KEYS } from '../enums/entity-keys';
import mockSalaData from './data-salas';
import mcokCategoriaSala from './data-categoria-asiento';
import mockCategoriaSalaData from './data-categoria-sala';
import { fakeUsersGenerator } from './data-users';

export const dataMap: { [key: string]:  () => Promise<unknown[]> | unknown[] } = {
  [ENTITIES_KEYS.SALA]: mockSalaData,
  [ENTITIES_KEYS.CATEGORIA_SALA]: mockCategoriaSalaData,
  [ENTITIES_KEYS.USERS]: fakeUsersGenerator,
};
