import { BaseApi } from "./api";
import { ApiConfig, extraData } from "../dtos/api-config.interface";
import { MockRepository } from "./mockRepository";
import { RepositoryType } from "../enums/RepositoryType";
import { RepositoryMap } from "../dtos/repository-map.dto";
import { IRepository } from "./IRepository";
import { ENTITIES_KEYS } from "../../enums/entity-keys";
import { confirmAlert } from "react-confirm-alert";

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
  public labelNamel?: string | undefined = "";

  constructor(public apiConfig: ApiConfig) {
    this.apiConfig = apiConfig;
    this.repository = BaseRepositoryFactory.factoryRepository<T>(apiConfig);
  }
  async get(extraData?: extraData<T>): Promise<T[]> {
    return this.repository.get(extraData);
  }
  async getById(id: string | number, extraData?: extraData<T>): Promise<T | undefined> {
    return this.repository.getById(id, extraData);
  }
  async add(newItem: T, extraData?: extraData<T>): Promise<T> {
    return this.repository.add(newItem, extraData);
  }
  async delete(id: string | number, extraData?: extraData<T>): Promise<T[]> {
    return this.repository.delete(id, extraData);
  }
  async edit(
    id: string | number,
    updatedItem: Omit<T, "id"> & { id?: string | number },
    extraData?: extraData<T>
  ): Promise<T> {
    return this.repository.edit(id, updatedItem, extraData);
  }
  async publishUpdateEvent() {
    this.repository.publishUpdateEvent();
  }

  async showDeleteMsg(e: T & { id?: string | number }) {
    if (e.id === undefined) return;
    const options = {
      title: "Eliminar " + this.apiConfig.labelName,
      message: `¿Desea eliminar este elemento:  ${this.apiConfig.labelName}?`,
      buttons: [
        {
          label: "Si",
          onClick: () => this.delete(e.id || -1),
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };
    confirmAlert(options);
  }

  getConfigPath(): string {
    return this.repository.getConfigPath();
  }

  getConfigRepositoryType(): string {
    return this.apiConfig.type;
  }
}
