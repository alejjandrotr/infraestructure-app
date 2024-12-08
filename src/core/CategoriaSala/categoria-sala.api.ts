import { RepositoryType } from "../Base/enums/RepositoryType";
import {
  BaseRepository,
} from "../Base/repositories/repository.abstract";
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { CategoriaSala } from "./categoria-sala";

class CategoriaSalaApi extends BaseRepository<CategoriaSala> {
  constructor() {
    super({
      path: ENTITIES_KEYS.CATEGORIA_SALA,
      type: RepositoryType.MOCK,
      labelName: "Categoria de la Sala",
    });
  }

  getEntityLabelName(d: CategoriaSala): string {
    return d.nombre;
  }
}
export const categoriaSalaRepository = new CategoriaSalaApi();
