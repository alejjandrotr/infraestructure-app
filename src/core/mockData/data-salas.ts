import mockCategoriaSalaData from './data-categoria-asiento'; 
import mockCategoriaAsientoData from './data-categoria-sala';
import { Sala } from '../Sala/sala';

export const mockSalaData = () => {
  const categoriasSalas = mockCategoriaSalaData();
  const categoriasAsientos = mockCategoriaAsientoData();

  let salas:Sala[] = []
  for (let index = 0; index < 500; index++) {
  
    salas =  salas.concat([
      { codigo: 'D' + index, capacidad: 127, largo: 27, ancho: 14, categoriaId: 1 }, 
      { codigo: 'J'+ index, capacidad: 183, largo: 20, ancho: 12, categoriaId: 2 }, 
      { codigo: 'Q'+ index, capacidad: 193, largo: 10, ancho: 11, categoriaId: 1 }, 
      { codigo: 'P'+ index, capacidad: 219, largo: 27, ancho: 10, categoriaId: 2 }, 
      { codigo: 'E'+ index, capacidad: 178, largo: 14, ancho: 7, categoriaId: 1 }, 
      { codigo: 'S'+ index, capacidad: 142, largo: 23, ancho: 5, categoriaId: 2 }, 
    ]);
  }
  

  return salas.map((sala, index) => ({
    id: index + 1,
    ...sala,
    asientos: generateSeats(sala.capacidad, index + 1), 
    categoriaNombre: categoriasSalas.find(c => c.id === sala.categoriaId)?.nombre 
  }));
};

const generateSeats = (capacity: number, salaId: number) => {
  const seats = [];
  
  for (let i = 0; i < capacity; i++) {
    const estado = Math.random() > 0.2 ? 'activo' : 'inactivo'; 
    const categoriaId = Math.random() > 0.5 ? 1 : 2; 
    seats.push({
      id: i + 1,
      estado,
      categoriaId,
      salaId,
      categoriaNombre: mockCategoriaAsientoData().find(c => c.id === categoriaId)?.nombre
    });
  }

  return seats;
};

export default mockSalaData;