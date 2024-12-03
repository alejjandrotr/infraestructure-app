import { BaseApi } from "./api";
import { ApiConfig } from "./api-config.interface";
import { MockRepository } from "./mockRepository";
import { RepositoryType } from "../enums/RepositoryType";
import { RepositoryMap } from "../dtos/repository-map.dto";
import { IRepository } from "./IRepository";
import { ENTITIES_KEYS } from "../../enums/entity-keys";

export abstract class BaseRepositoryFactory<T> {
  static factoryRepository<T>(config: ApiConfig): IRepository<T> {
    const repositoryBuilders: RepositoryMap<T> = {
      [RepositoryType.MOCK]: () =>
        new MockRepository<T & { id?: string }>(config),
      [RepositoryType.API]: () => undefined,
      [RepositoryType.LOCALSTORAGE]: () => undefined,
    };

    const builder = repositoryBuilders[config.type as RepositoryType];

    if (!builder) {
      throw new Error(`Invalid repository type: ${config.type}`);
    }

    const repository = builder();

    if (repository === undefined) {
      throw new Error("This API is not ready to use");
    }
    return repository;
  }
}

export abstract class BaseRepository<T> implements IRepository<T> {
  public repository: IRepository<T>;

  constructor({path, type}: ApiConfig) {
    this.repository = BaseRepositoryFactory.factoryRepository<T>({
      path,
      type,
    });
  }
  async get(filter?: string | Partial<T> | undefined): Promise<T[]> {
    return this.repository.get(filter);
  }
  async getById(id: string | number): Promise<T | undefined> {
    return this.repository.getById(id);
  }
  async add(newItem: T): Promise<T> {
    return this.repository.add(newItem);
  }
  async delete(id: string | number): Promise<T[]> {
    return this.repository.delete(id);
  }
  async edit(
    id: string | number,
    updatedItem: Omit<T, "id"> & { id?: string | number }
  ): Promise<T> {
    return this.repository.edit(id, updatedItem);
  }
  async publishUpdateEvent() {
    this.repository.publishUpdateEvent();
  }
}
