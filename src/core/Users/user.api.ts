import { NavigateFunction } from "react-router-dom";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { BaseRepository } from "../Base/repositories/repository.abstract";
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { LoginDto, User } from "./user";
import { NotFoundUserError } from "./errors/user-not-found.error";
import { UserWrongPasswordError } from "./errors/user-wrong-password.error";

class UserApi extends BaseRepository<User> {
  constructor() {
    super({
      path: ENTITIES_KEYS.USERS,
      type: RepositoryType.MOCK,
      labelName: "Usuario",
    });
  }

  /**
   * TO-DO:  spread into the another logic repositories
   */
  async login(
    loginDto: LoginDto
  ): Promise<{ token: string }> {
    const users = await this.get();
    const user = users.find((us) => us.usuario === loginDto.usuario);
    if (!user) {
      throw new NotFoundUserError();
    }

    if (user.contraseña !== loginDto.contraseña) {
      throw new UserWrongPasswordError();
    }

    return { token: JSON.stringify(user) };
  }
}
export const userRepository = new UserApi();
