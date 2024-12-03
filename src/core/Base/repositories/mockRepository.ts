import toast from 'react-hot-toast';
import { publish } from '../../events';
import { dataMap } from '../../mockData';
import { ApiConfig } from './api-config.interface';
import { IRepository } from './IRepository';
import { v4 as uuidv4 } from 'uuid';

class NotFoundError extends Error {
  constructor(path: string, id: string) {
    super(`The ${path} with id ${id} not found.`);
    this.name = 'NotFoundError';
  }
}

export class MockRepository<T extends { id?: string }>
  implements IRepository<T>
{
  private data: T[] = []; // In-memory data storage

  constructor(private config: ApiConfig) {
    this.loadData();
  }

  publishUpdateEvent(data?: unknown): void {
    publish(this.config.path, data);
  }

  private async loadData(): Promise<void> {
    const fileName = this.config.path;
    try {
      if (dataMap[fileName] === undefined) {
        this.data = [];
        return;
      }
      const mockDataFunction: () => Promise<unknown[]> | unknown[] = dataMap[fileName];
      this.data = await mockDataFunction() as T[];
    } catch (error) {
      console.error('Error fetching initial data:', error);
      throw error;
    }
  }

  async get(filter?: Partial<T> | string): Promise<T[]> {

    if (!filter) return this.data; 
    
    if (typeof filter === 'string') {
      const lowercasedFilter = filter.toLowerCase();
      return this.data.filter((obj) =>
        Object.values(obj).some((value) =>
          String(value).toLowerCase().includes(lowercasedFilter)
        )
      );
    }
    return this.data.filter((obj) => this.matchesFilter(obj, filter));
  }

  private matchesFilter(obj: T, filter: Partial<T>): boolean {
    return Object.entries(filter).every(([key, filterValue]) => {
      const objAttrValue = obj[key as keyof T ];
      if (filterValue === undefined) return true;
      return objAttrValue === filterValue;
    });
  }

  async getById(id: string): Promise<T | undefined> {
    return this.data.find((item) => item.id === id);
  }

  async add(newItem: T): Promise<T> {
    newItem.id = uuidv4();
    this.data.push(newItem);
    this.publishUpdateEvent(this.data);
    return newItem;
  }

  async delete(id: string): Promise<T[]> {
    const itemToDelete = await this.getById(id);

    if (!itemToDelete) {
      throw new NotFoundError(this.config.path, id);
    }

    this.data = this.data.filter((item) => item.id !== id);
    this.publishUpdateEvent(this.data);
    toast.success('Se ha eliminado correctamente el elemento');
    return this.data;
  }

  async edit(
    id: string,
    updatedItem: Omit<T, 'id'> & { id: string }
  ): Promise<T> {
    const existingItem = await this.getById(id);

    if (!existingItem) {
      throw new NotFoundError(this.config.path, id);
    }

    const editedItem = { ...existingItem, ...updatedItem };
    const index = this.data.findIndex((item) => item.id === id);

    this.data[index] = editedItem;
    this.publishUpdateEvent(this.data);
    return editedItem;
  }
}
