import mockCategoriaSalaData from "./data-categoria-sala";
import mockCategoriaAsientoData from "./data-categoria-asiento";
import { Sala } from "../Sala/sala";
import { Asiento } from "../Asientos/asiento";

export const createSala = (index: number, categoriaId: number): Sala => {
  const letter = String.fromCharCode(65 + (index % 26)); // A-Z corresponds to ASCII 65-90
  return {
    id: index + 1,
    codigo: `${letter}${Math.floor(index / 26)}`, // Append a number to distinguish codes after Z
    capacidad: [127, 183, 193, 219, 178, 142][index % 6], // Cycle through capacities
    largo: [27, 20, 10, 27, 14, 23][index % 6], // Cycle through lengths
    ancho: [14, 12, 11, 10, 7, 5][index % 6], // Cycle through widths
    categoriaId,
  };
};

export const mockAsiento = (id: number, salaId: number): Asiento => {
  const estado = Math.random() > 0.2 ? "activo" : "inactivo";
  const categoriaId = Math.random() > 0.5 ? 1 : 2;
  const categoriaNombre = mockCategoriaAsientoData().find(
    (c) => c.id === categoriaId
  )?.nombre;

  return {
    id,
    estado,
    categoriaId,
    salaId,
    categoriaNombre,
    fila: String.fromCharCode(65 + Math.floor((id - 1) / 25)),
    columna: `${((id - 1) % 25) + 1}`,
  };
};

const generateSeats = (capacity: number, salaId: number): Asiento[] => {
  const seats: Asiento[] = [];

  for (let i = 1; i <= capacity; i++) {
    seats.push(mockAsiento(i, salaId));
  }

  return seats;
};

export const mockSalaData = () => {
  const categoriasSalas = mockCategoriaSalaData();

  const salas: Sala[] = [];

  for (let index = 0; index < 500; index++) {
    const categoriaId = (index % 2) + 1;
    const sala = createSala(index, categoriaId);

    salas.push({
      ...sala,
      asientos: generateSeats(sala.capacidad, sala.id as number),
    });
  }

  return salas;
};

export default mockSalaData;
