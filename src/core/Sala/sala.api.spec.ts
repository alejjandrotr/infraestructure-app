import { salaRepository } from "./sala.api";
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { createSala } from "../mockData/data-salas";
import { Sala } from "./sala";


describe("SalaApi", () => {
  beforeEach(() => {});

  test("should have correct configuration", () => {
    expect(salaRepository.getConfigPath()).toBe(ENTITIES_KEYS.SALA);
  });

  test("should be of type MOCK", () => {
    expect(salaRepository.getConfigRepositoryType()).toBe(RepositoryType.MOCK);
  });

  test("should add a new sala", async () => {
    const newSala = createSala(1, 1);
    const mockAdd = jest
      .spyOn(salaRepository.repository, "add")
      .mockResolvedValue({ id: 1, ...newSala });

    const result = await salaRepository.add(newSala);

    expect(mockAdd).toHaveBeenCalledWith(newSala, undefined);
    expect(result).toEqual({ id: "1", ...newSala });
  });

  test("should delete a sala by ID", async () => {
    const mockDelete = jest
      .spyOn(salaRepository.repository, "delete")
      .mockResolvedValue([]);

    const result = await salaRepository.delete("1");

    expect(mockDelete).toHaveBeenCalledWith("1", undefined);
    expect(result).toEqual([]);
  });

  test("should edit a sala by ID", async () => {
    const updatedSala: Sala = {
      id: 1,
      ...createSala(1, 1),
      ancho: 3510,
    };

    const mockEdit = jest
      .spyOn(salaRepository.repository, "edit")
      .mockResolvedValue(updatedSala);

    const result = await salaRepository.edit("1", updatedSala);

    expect(mockEdit).toHaveBeenCalledWith("1", updatedSala, undefined);
    expect(result).toEqual(updatedSala);
  });
});
