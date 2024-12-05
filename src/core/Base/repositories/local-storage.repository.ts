import { ApiConfig } from '../dtos/api-config.interface';
import { IRepository } from './IRepository';
import { NotFoundError } from '../errors/not-found.error';

export class LocalStorageRepository<T extends { id: string }> implements IRepository<T> {
  constructor(private config: ApiConfig) {}
  setConfigPrePath(ps: string): string {
    throw new Error('Method not implemented.');
  }
  labelNamel?: string | undefined;
  getConfigPath(): string {
    throw new Error('Method not implemented.');
  }
  
  
  publishUpdateEvent(): void {
    throw new Error('Method not implemented.');
  }

  private getStorageKey(): string {
    return this.config.path;
  }

  async get(): Promise<T[]> {
    const storedData = localStorage.getItem(this.getStorageKey());
    return storedData ? JSON.parse(storedData) : [];
  }

  async getById(id: string): Promise<T | undefined> {
    const currentData = await this.get();
    return currentData.find((item) => item.id === id);
  }

  async add(newItem: T): Promise<T> {
    const currentData = await this.get();
    if (currentData.some((item) => item.id === newItem.id)) {
      throw new Error(`Item with id ${newItem.id} already exists.`);
    }
    currentData.push(newItem);
    localStorage.setItem(this.getStorageKey(), JSON.stringify(currentData));
    return newItem;
  }

  async delete(id: string): Promise<T[]> {
    const currentData = await this.get();
    const itemToDelete = await this.getById(id);

    if (!itemToDelete) {
      throw new NotFoundError(this.getStorageKey(), id);
    }

    const updatedData = currentData.filter((item) => item.id !== id);
    localStorage.setItem(this.getStorageKey(), JSON.stringify(updatedData));
    return updatedData;
  }

  async edit(id: string, updatedItem: Omit<T, 'id'> & { id: string }): Promise<T> {
    const currentData = await this.get();
    const existingItem = await this.getById(id);

    if (!existingItem) {
      throw new NotFoundError(this.getStorageKey(), id);
    }

    const editedItem = { ...existingItem, ...updatedItem };
    const index = currentData.findIndex((item) => item.id === id);
    
    currentData[index] = editedItem;
    localStorage.setItem(this.getStorageKey(), JSON.stringify(currentData));

    return editedItem;
  }
}