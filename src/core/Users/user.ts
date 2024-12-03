import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().optional(),
  usuario: z.string().min(1, 'El nombre de usuario es requerido'),
  contraseña: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  nombre_completo: z.string().min(1, 'El nombre completo es requerido'),
  telefono: z.string().optional(),
  direccion: z.object({
    pais: z.string().min(1, 'El país es requerido'),
    estado: z.string().min(1, 'El estado es requerido'),
    ciudad: z.string().min(1, 'La ciudad es requerida'),
  }),
});

export const UserSchemaFilter = UserSchema.partial();

export type User = z.infer<typeof UserSchema> 

export type UserFilter = z.infer<typeof UserSchemaFilter> 

export const createNewUser: () => User = () => {
  return {
    usuario: '',
    contraseña: '',
    nombre_completo: '',
    direccion: {
      pais: '',
      estado: '',
      ciudad: '',
    },
  };
};