import { z } from "zod";

// Esquema para un asiento
export const AsientoSchema = z.object({
  id: z.number().optional(), // ID positivo
  estado: z.enum(['activo', 'inactivo']), // Estado del asiento
  categoriaId: z.number().positive('El ID de la categoría debe ser un número positivo'), // ID de la categoría
  salaId: z.number().positive('El ID de la sala debe ser un número positivo'), // ID de la sala
  categoriaNombre: z.string().optional(), // Nombre de la categoría (opcional)
  fila: z.string().min(1, 'La fila debe ser una cadena no vacía'), // Fila del asiento como cadena
  columna: z.string().min(1, 'La columna debe ser una cadena no vacía'), // Columna del asiento como cadena
  coordenadaX: z.number().optional(), // Coordenada X (opcional)
  coordenadaY: z.number().optional(), // Coordenada Y (opcional)
});


export const AsientoSchemaFilter = z.object({
  estado: z.enum(["activo", "inactivo"]).optional(),
  categoriaId: z.number().positive().optional(),
  salaId: z.number().positive().optional(),
});

export type Asiento = z.infer<typeof AsientoSchema>;
export type AsientoFilter = z.infer<typeof AsientoSchemaFilter>;

export const createNewAsiento: () => Asiento = () => {
  return {
    estado: "activo",
    categoriaId: 1,
    salaId: 1,
    fila: 'A',
    columna: '1'
  };
};
