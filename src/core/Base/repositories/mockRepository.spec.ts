import { MockRepository } from "./mockRepository";
import { ApiConfig } from "../dtos/api-config.interface";
import { extraData } from "../dtos/api-config.interface";
import { RepositoryType } from "../enums/RepositoryType";
import {
  mockData,
  mockDataWithSubitem,
  mockSubItemData,
} from "../../mockData/mockData";
import { ENTITIES_KEYS } from "../../enums/entity-keys";

jest.mock("../../events", () => ({
  publish: jest.fn(),
}));

describe("Test Mock repository", () => {
  describe("MockRepository wtih One", () => {
    let repository: MockRepository<{ id?: string; name?: string }>;

    beforeEach(async () => {
      const config: ApiConfig = {
        path: ENTITIES_KEYS.MOCK_DATA,
        type: RepositoryType.MOCK,
        labelName: "MOCK",
      };
      repository = new MockRepository(config);
    });

    test("should load initial data correctly", async () => {
      const data = await repository.get();
      expect(data).toEqual(mockData());
    });

    test("should add a new item", async () => {
      const newItem = { name: "New Item" };
      const addedItem = await repository.add(newItem);

      expect(addedItem).toHaveProperty("id");
      expect(addedItem.name).toBe(newItem.name);

      const allData = await repository.get();
      expect(allData).toContainEqual(addedItem);
    });

    test("should edit an existing item", async () => {
      const updatedItem = { id: "1", name: "Updated Item" };
      const editedItem = await repository.edit("1", updatedItem);

      expect(editedItem.name).toBe(updatedItem.name);

      const allData = await repository.get();
      expect(allData).toContainEqual(editedItem);
    });

    test("should delete an item", async () => {
      const initialData = await repository.get();
      expect(initialData.length).toBe(2);

      await repository.delete("1");

      const updatedData = await repository.get();
      expect(updatedData.length).toBe(1);
      expect(updatedData).not.toContainEqual(initialData[0]);
    });

    test("should throw NotFoundError when deleting non-existent item", async () => {
      await expect(repository.delete("non-existent-id")).rejects.toThrowError();
    });

    test("should get an item by ID", async () => {
      const item = await repository.getById("1");
      expect(item).toEqual(mockData()[0]);
    });

    test("should not get an item by ID", async () => {
      const nonExistentItem = await repository.getById("non-existent-id");
      expect(nonExistentItem).toBeUndefined();
    });
  });

  describe("MockRepository with Subitems", () => {
    let repository: MockRepository<{
      id?: string;
      name?: string;
      subItem?: any[];
    }>;

    beforeEach(async () => {
      const config: ApiConfig = {
        path: ENTITIES_KEYS.MOCK_DATA_SUBITEM,
        type: RepositoryType.MOCK,
        labelName: "MOCK",
      };
      repository = new MockRepository(config);
    });

    test("should load initial data correctly with subitems", async () => {
      const data = await repository.get();
      expect(data).toEqual(mockDataWithSubitem());
    });

    test("should get subitems by prePath", async () => {
      const extra: extraData<{ id?: string }> = { prePath: "mock/1" };
      const subItems = await repository.get(extra);

      expect(subItems).toEqual(mockSubItemData());
    });

    test("should add a new subitem", async () => {
      const newItem = { name: "New Sub Item" };
      const extra: extraData<{ id?: string }> = { prePath: "mock/1" };

      const addedItem = await repository.add(newItem, extra);

      expect(addedItem).toHaveProperty("id");
      expect(addedItem.name).toBe(newItem.name);

      const allSubItems = await repository.get(extra);
      expect(allSubItems).toContainEqual(addedItem);
    });

    test("should delete a subitem", async () => {
      const extra: extraData<{ id?: string }> = { prePath: "mock/1" };

      await repository.delete("1", extra);

      const updatedSubItems = await repository.get(extra);
      expect(updatedSubItems.length).toBe(1);
      expect(updatedSubItems).not.toContainEqual({ id: "1", name: "Item 1" });
    });

    test("should edit a subitem", async () => {
      const extra: extraData<{ id?: string }> = { prePath: "mock/1" };
      const updatedSubItem = { id: "1", name: "Updated Sub Item" };
      const editedItem = await repository.edit("1", updatedSubItem, extra);
      expect(editedItem.name).toBe(updatedSubItem.name);
      const updatedSubItems = await repository.get(extra);
      expect(updatedSubItems).toContainEqual(editedItem);
    });
  });
});
