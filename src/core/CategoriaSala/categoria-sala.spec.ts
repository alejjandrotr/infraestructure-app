import { categoriaSalaRepository } from "./categoria-sala.api";
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { mockCategoriaSalaData } from "../mockData/data-categoria-sala";

describe("CategoriaSalaApi", () => {
  beforeEach(() => {});

  test("should have correct configuration", () => {
    expect(categoriaSalaRepository.getConfigPath()).toBe(
      ENTITIES_KEYS.CATEGORIA_SALA
    );
  });

  test("should be of type MOCK", () => {
    expect(categoriaSalaRepository.getConfigRepositoryType()).toBe(
      RepositoryType.MOCK
    );
  });

  test("should add a new categoria sala", async () => {
    const newCategoria = mockCategoriaSalaData()[0];
    const mockAdd = jest
      .spyOn(categoriaSalaRepository.repository, "add")
      .mockResolvedValue({ ...newCategoria, id: 5654 });

    const result = await categoriaSalaRepository.add(newCategoria);

    expect(mockAdd).toHaveBeenCalledWith(newCategoria, undefined);
    expect(result).toEqual({ ...newCategoria, id: 5654 });
  });

  test("should delete a categoria sala by ID", async () => {
    const mockDelete = jest
      .spyOn(categoriaSalaRepository.repository, "delete")
      .mockResolvedValue([]);

    const result = await categoriaSalaRepository.delete("1");

    expect(mockDelete).toHaveBeenCalledWith("1", undefined);
    expect(result).toEqual([]);
  });

  test("should edit a categoria sala by ID", async () => {
    const updatedCategoria = {
      ...mockCategoriaSalaData()[0],
      name: "Updated Categoria",
    };

    const mockEdit = jest
      .spyOn(categoriaSalaRepository.repository, "edit")
      .mockResolvedValue(updatedCategoria);

    const result = await categoriaSalaRepository.edit("1", updatedCategoria);

    expect(mockEdit).toHaveBeenCalledWith("1", updatedCategoria, undefined);
    expect(result).toEqual(updatedCategoria);
  });
});
