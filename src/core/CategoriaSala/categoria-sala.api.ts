import { RepositoryType } from '../Base/enums/RepositoryType';
import { BaseRepositoryFactory } from '../Base/repositories/repository.abstract';
import { ENTITIES_KEYS } from '../enums/entity-keys';
import { CategoriaSala } from './categoria-sala';

/*class SalaApi extends BaseRepositoryFactory<Sala> {
  constructor() {
    super({ path: 'sala', type: RepositoryType.MOCK });
  }
}*/
export const categoriaSalaRepository = BaseRepositoryFactory.factoryRepository<CategoriaSala>({
  path: ENTITIES_KEYS.CATEGORIA_SALA,
  type: RepositoryType.MOCK,
});
