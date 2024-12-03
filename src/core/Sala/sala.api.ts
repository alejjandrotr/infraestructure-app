import { RepositoryType } from '../Base/enums/RepositoryType';
import { BaseRepositoryFactory } from '../Base/repositories/repository.abstract';
import { ENTITIES_KEYS } from '../enums/entity-keys';
import { Sala } from './sala';

/*class SalaApi extends BaseRepositoryFactory<Sala> {
  constructor() {
    super({ path: 'sala', type: RepositoryType.MOCK });
  }
}*/
export const salaRepository = BaseRepositoryFactory.factoryRepository<Sala>({
  path: ENTITIES_KEYS.SALA,
  type: RepositoryType.MOCK,
});
