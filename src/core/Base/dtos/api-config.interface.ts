import { RepositoryType } from "../enums/RepositoryType";

export interface ApiConfig {
  path: string;
  type: RepositoryType;
  labelName: string;
}

export interface extraData<T> {
  prePath?: string;
  postPath?: string;
  filter?: Partial<T> | string;
}
