import { RepositoryType } from "../Base/enums/RepositoryType";
import {
  BaseRepository,
  BaseRepositoryFactory,
} from "../Base/repositories/repository.abstract";
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { Sala } from "./sala";

class SalaApi extends BaseRepository<Sala> {
  constructor() {
    super({
      path: ENTITIES_KEYS.SALA,
      type: RepositoryType.MOCK,
      labelName: "Sala",
    });
  }
}
export const salaRepository = new SalaApi();
