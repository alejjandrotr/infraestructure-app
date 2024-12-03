import { z } from 'zod';

export const CategoriaSalaSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, 'Debe colocar mas de una letra'),
});



export type CategoriaSala = z.infer<typeof CategoriaSalaSchema>;

export const CategoriaSchemaFilter = CategoriaSalaSchema.partial();
export type CategoriaSalaFilter = z.infer<typeof CategoriaSchemaFilter>;

export const createNewCategoriaSala: () => CategoriaSala = () => {
  return {
    nombre: '',
  };
};
