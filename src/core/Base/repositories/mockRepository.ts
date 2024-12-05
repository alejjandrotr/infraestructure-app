import toast from "react-hot-toast";
import { publish } from "../../events";
import { dataMap } from "../../mockData";
import { ApiConfig, extraData } from "../dtos/api-config.interface";
import { IRepository } from "./IRepository";
import { v4 as uuidv4 } from "uuid";

class NotFoundError extends Error {
  constructor(path: string, id: string) {
    super(`The ${path} with id ${id} not found.`);
    this.name = "NotFoundError";
  }
}

export class MockRepository<T extends { id?: string }>
  implements IRepository<T>
{
  private data: T[] = [];
  labelNamel?: string | undefined;

  constructor(private config: ApiConfig) {
    this.loadData();
  }

  getConfigPath(): string {
    return this.config.path;
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
      const mockDataFunction: () => Promise<unknown[]> | unknown[] =
        dataMap[fileName];
      this.data = (await mockDataFunction()) as T[];
    } catch (error) {
      console.error("Error fetching initial data:", error);
      throw error;
    }
  }

  async get(extraData?: extraData<T>): Promise<T[]> {
    const actualData = this.getData(this.data, extraData);
    if (!extraData || !extraData.filter) return actualData;
    const { filter } = extraData;
    if (typeof filter === "string") {
      const lowercasedFilter = filter.toLowerCase();
      return actualData.filter((obj) =>
        Object.values(obj).some((value) =>
          String(value).toLowerCase().includes(lowercasedFilter)
        )
      );
    }
    return actualData.filter((obj) => this.matchesFilter(obj, filter));
  }

  private getData(data: T[], extraData?: extraData<T>): T[] {
    if (!extraData || !extraData.prePath) {
      return data;
    }

    const foundObject = this.getParentData(extraData, data);

    if (!foundObject) {
      return [];
    }
    const key = this.config.path as keyof T;
    return (foundObject[key] as T[]) || [];
  }

  private getParentData(extraData: extraData<T>, data: T[]) {
    if (extraData.prePath === undefined)
      throw new Error("Entity without parent");
    const [path, id] = extraData.prePath.split("/");
    const foundObject = data.find((obj) => obj.id + "" === id);
    return foundObject;
  }

  /** Aunque no es eficiente se supone esto lo hace el backend */
  private matchesFilter(obj: T, filter: Partial<T>): boolean {
    return Object.entries(filter).every(([key, filterValue]) => {
      if (filterValue === undefined || filterValue === "") return true;

      const objAttrValue = obj[key as keyof T];
      if (typeof filterValue === "object" && filterValue !== null) {
        return this.matchesFilter(objAttrValue as T, filterValue);
      }

      if (typeof objAttrValue === "string" && typeof filterValue === "string") {
        return objAttrValue.toLowerCase().includes(filterValue.toLowerCase());
      }

      return objAttrValue === filterValue;
    });
  }

  async getById(id: string, extraData?: extraData<T>): Promise<T | undefined> {
    const actualData = this.getData(this.data, extraData);
    const result = actualData.find((item) => item.id === id);
    return Promise.resolve(result);
  }

  async add(newItem: T, extraData?: extraData<T>): Promise<T> {
    const actualData = this.getData(this.data, extraData);
    newItem.id = uuidv4();
    actualData.push(newItem);
    this.publishUpdateEvent(newItem);
    return newItem;
  }

  async delete(id: string, extraData?: extraData<T>): Promise<T[]> {
    const itemToDelete = await this.getById(id, extraData);

    if (!itemToDelete) {
      throw new NotFoundError(this.config.path, id);
    }

    const actualData = this.getData(this.data, extraData);
    const filteredData = actualData.filter((item) => item.id !== id);

    if (extraData?.prePath === undefined) {
      this.data = filteredData;
    } else {
      const parentData = this.getParentData(extraData, this.data) as any;
      const key = this.config.path as any;
      parentData[key] = filteredData;
    }

    this.publishUpdateEvent(this.data);
    toast.success("Se ha eliminado correctamente el elemento");
    return this.data;
  }

  async edit(
    id: string,
    updatedItem: Omit<T, "id"> & { id: string },
    extraData?: extraData<T>
  ): Promise<T> {
    const existingItem = await this.getById(id, extraData);

    if (!existingItem) {
      throw new NotFoundError(this.config.path, id);
    }

    const editedItem = { ...existingItem, ...updatedItem };

    const actualData = this.getData(this.data, extraData);
    const index = actualData.findIndex((item) => item.id === id);

    actualData[index] = editedItem;
    this.publishUpdateEvent(editedItem);
    return editedItem;
  }
}
