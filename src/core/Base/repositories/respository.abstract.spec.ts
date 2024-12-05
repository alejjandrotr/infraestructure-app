import { ENTITIES_KEYS } from "../../enums/entity-keys";
import { ApiConfig } from "../dtos/api-config.interface";
import { RepositoryType } from "../enums/RepositoryType"; 
import { BaseRepository } from "./repository.abstract";

class MockTestRepository<T> extends BaseRepository<T> {
  constructor(config: ApiConfig) {
    super(config);
  }
}

describe("BaseRepository", () => {
  let repository: MockTestRepository<{ id?: string; name?: string }>;

  beforeEach(() => {
    const config: ApiConfig = {
      path: ENTITIES_KEYS.MOCK_DATA,
      type: RepositoryType.MOCK,
      labelName: "MOCK",
    };
    repository = new MockTestRepository(config);
  });

  test("should initialize with correct config", () => {
    expect(repository.getConfigPath()).toBe(ENTITIES_KEYS.MOCK_DATA);
  });

  test("should call get method on repository", async () => {
    const mockGet = jest
      .spyOn(repository.repository, "get")
      .mockResolvedValue([{ id: "1", name: "John Doe" }]);

    const result = await repository.get();

    expect(mockGet).toHaveBeenCalled();
    expect(result).toEqual([{ id: "1", name: "John Doe" }]);
  });

  test("should call add method on repository", async () => {
    const newItem = { name: "Jane Doe" };
    const mockAdd = jest
      .spyOn(repository.repository, "add")
      .mockResolvedValue({ id: "2", ...newItem });

    const result = await repository.add(newItem);

    expect(mockAdd).toHaveBeenCalledWith(newItem, undefined);
    expect(result).toEqual({ id: "2", ...newItem });
  });

  test("should call delete method on repository", async () => {
    const mockDelete = jest
      .spyOn(repository.repository, "delete")
      .mockResolvedValue([]);

    const result = await repository.delete("1");

    expect(mockDelete).toHaveBeenCalledWith("1", undefined);
    expect(result).toEqual([]);
  });

  test("should call edit method on repository", async () => {
    const updatedItem = { id: "1", name: "Updated Name" };
    const mockEdit = jest
      .spyOn(repository.repository, "edit")
      .mockResolvedValue(updatedItem);

    const result = await repository.edit("1", updatedItem);

    expect(mockEdit).toHaveBeenCalledWith("1", updatedItem, undefined);
    expect(result).toEqual(updatedItem);
  });
});
