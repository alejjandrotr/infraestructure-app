import { RepositoryType } from '../Base/enums/RepositoryType';
import { BaseRepository, BaseRepositoryFactory } from '../Base/repositories/repository.abstract';
import { ENTITIES_KEYS } from '../enums/entity-keys';
import { User } from './user';

class UserApi extends BaseRepository<User> {
  constructor() {
    super({
      path: ENTITIES_KEYS.USERS,
      type: RepositoryType.MOCK,
    })
  }

  
}
export const userRepository = new UserApi();
