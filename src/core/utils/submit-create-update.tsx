import toast from "react-hot-toast";
import { IRepository } from "../Base/repositories/IRepository";

export async function  submitToCreateOrUpdate<T>(
  data: T & { id?: string | number },
  repository: IRepository<T>
) {
  try {
    if (data.id !== undefined) {
      const { id, ...rest } = data;
      await repository.edit(id, rest);
      toast.success('Se ha eliminado exitosamente');
      return;
    }
    await repository.add(data);
    toast.success('Se ha agregado exitosamente');
  } catch (e: any) {
    toast.error(e.response?.data?.message || "Error Inesperado");
    throw e;
  }
}