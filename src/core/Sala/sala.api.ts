import { extraData } from "../Base/dtos/api-config.interface";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { BaseRepository } from "../Base/repositories/repository.abstract";
import { categoriaSalaRepository } from "../CategoriaSala/categoria-sala.api";
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

  async get(extraData?: extraData<Sala> | undefined): Promise<Sala[]> {
    const data = await super.get(extraData);
    if (this.getConfigRepositoryType() === RepositoryType.MOCK) {
      const salaCategoria = await categoriaSalaRepository.getOptionsLikeMap();
      return data.map((sala) => ({
        ...sala,
        categoriaNombre: salaCategoria[sala.categoriaId as number].label,
      }));
    }
    return data;
  }

  getEntityLabelName(d: Sala): string {
    return d.codigo;
  }
}
export const salaRepository = new SalaApi();
