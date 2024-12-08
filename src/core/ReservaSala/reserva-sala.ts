import { z } from "zod";
import { Sala } from "../Sala/sala";

export const ReservaSalaSchema = z
  .object({
    id: z.number().optional(),
    fechaInicio: z.date().refine((date) => date >= new Date(), {
      message: "La fecha de inicio debe ser una fecha futura.",
    }),
    fechaFin: z.date().refine(
      (date) => {
        const now = new Date();
        return date > now;
      },
      {
        message: "La fecha de fin debe ser una fecha futura.",
      }
    ),
    idSala: z.number(),
  })
  .refine(
    (obj) => {
      return obj.fechaFin > obj.fechaInicio;
    },
    {
      message: "La fecha de inicio debe ser menor a la fecha de fin",
      path: ["fechaFin"],
    }
  );

export const ReservaSalaFilterSchema = z
  .object({
    id: z.number().optional(),
    fechaInicio: z.date().optional().catch(undefined),
    fechaFin: z.coerce.date().optional().catch(undefined),
    idSala: z.number().optional().catch(undefined),
  })
  .refine(
    (obj) => {
      console.log(obj);
      if (!obj.fechaFin || !obj.fechaInicio) return true;
      return obj.fechaFin > obj.fechaInicio;
    },
    {
      message: "La fecha de inicio debe ser menor a la fecha de fin",
      path: ["fechaFin"],
    }
  );

export type ReservaSala = z.infer<typeof ReservaSalaSchema> & { sala?: Sala };
export type ReservaSalaFilter = z.infer<typeof ReservaSalaFilterSchema>;

export const createNewReservaSala: () => ReservaSala = () => {
  return {
    fechaInicio: new Date(),
    fechaFin: new Date(new Date().setHours(new Date().getHours() + 1)),
    idSala: 1,
  };
};
