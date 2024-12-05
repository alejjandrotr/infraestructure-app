import { extraData } from "../dtos/api-config.interface";

export interface IRepository<T> {
  labelNamel?: string;

  get(extraData?: extraData<T>): Promise<T[]>;
  getById(
    id: string | number,
    extraData?: extraData<T>
  ): Promise<T | undefined>;
  add(newItem: T, extraData?: extraData<T>): Promise<T>;
  delete(id: string | number, extraData?: extraData<T>): Promise<T[]>;
  edit(
    id: string | number,
    updatedItem: Omit<T, "id"> & { id?: string | number },
    extraData?: extraData<T>
  ): Promise<T>;
  publishUpdateEvent(): void;

  getConfigPath(): string;
}
