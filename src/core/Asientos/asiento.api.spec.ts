import { asientosRepository } from "./asiento.api"; 
import { ENTITIES_KEYS } from "../enums/entity-keys";
import { RepositoryType } from "../Base/enums/RepositoryType";
import { mockAsiento } from "../mockData/data-salas"; 
import { Asiento } from "./asiento"; 

describe("AsientoApi", () => {
  const idSala = 1; 


  test("should have correct configuration", () => {
    expect(asientosRepository.getConfigPath()).toBe(ENTITIES_KEYS.ASIENTOS);
  });

  test("should be of type MOCK", () => {
    expect(asientosRepository.getConfigRepositoryType()).toBe(
      RepositoryType.MOCK
    );
  });

  test("should add a new asiento", async () => {
    const newAsiento = mockAsiento(1, idSala); // Assuming mockAsiento generates a mock Asiento object
    const extraData = { idSala };

    const mockAdd = jest
      .spyOn(asientosRepository.repository, "add")
      .mockResolvedValue({ id: 1, ...newAsiento });

    const result = await asientosRepository.add(newAsiento, extraData);

    expect(mockAdd).toHaveBeenCalledWith(newAsiento, {
      prePath: asientosRepository.generateSalaPath(idSala),
    });
    expect(result).toEqual({ id: "1", ...newAsiento });
  });

  test("should delete an asiento by ID", async () => {
    const extraData = {
      prePath: asientosRepository.generateSalaPath(idSala),
    };

    const mockDelete = jest
      .spyOn(asientosRepository.repository, "delete")
      .mockResolvedValue([]);

    const result = await asientosRepository.delete("1", extraData);

    expect(mockDelete).toHaveBeenCalledWith("1", {
      ...extraData,
    });
    expect(result).toEqual([]);
  });

  test("should edit an asiento by ID", async () => {
    const updatedAsiento: Asiento = {
      id: 1,
      ...mockAsiento(1, idSala),
      estado: "inactivo",
    };

    const extraData = { idSala };

    const mockEdit = jest
      .spyOn(asientosRepository.repository, "edit")
      .mockResolvedValue(updatedAsiento);

    const result = await asientosRepository.edit(
      "1",
      updatedAsiento,
      extraData
    );

    expect(mockEdit).toHaveBeenCalledWith("1", updatedAsiento, {
      prePath: asientosRepository.generateSalaPath(idSala),
    });
    expect(result).toEqual(updatedAsiento);
  });

  test("should generate correct sala path", () => {
    const expectedPath = `${ENTITIES_KEYS.SALA}/${idSala}`;

    expect(asientosRepository.generateSalaPath(idSala)).toBe(expectedPath);
  });
});