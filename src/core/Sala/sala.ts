import { z } from 'zod';
import { Asiento } from '../Asientos/asiento';

export const SalaSchema = z.object({
  id: z.number().optional(),
  codigo: z.string().min(1, 'Debe colocar mas de una letra'),
  capacidad: z.number(),
  categoriaId: z.number(),
  largo: z.number(),
  ancho: z.number(),
});

export const SalaSchemaFilter = SalaSchema.partial();

export type Sala = z.infer<typeof SalaSchema> & {
  categoriaNombre?: string;
  asientos?: Asiento[]
};
export type SalaFilter = z.infer<typeof SalaSchemaFilter> & {
  categoriaId?: string | number;
};

export const createNewSala: () => Sala = () => {
  return {
    codigo: '',
    categoriaId: 1,
    capacidad: 25,
    largo: 12,
    ancho: 8,
  };
};
