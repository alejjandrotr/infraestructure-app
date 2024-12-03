export interface IRepository<T> {
  get(filter?: Partial<T> | string): Promise<T[]>;
  getById(id: string | number): Promise<T | undefined>;
  add(newItem: T): Promise<T>;
  delete(id: string | number): Promise<T[]>;
  edit(
    id: string | number,
    updatedItem: Omit<T, 'id'> & { id?: string | number }
  ): Promise<T>;
  publishUpdateEvent(): void;
}
