import { useState } from "react";
import toast from "react-hot-toast";
import Modal, { ModalProps } from "../../../components/modals/form.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asiento, AsientoSchema } from "../../../core/Asientos/asiento"; // Asegúrate de que la ruta sea correcta
import { useForm } from "react-hook-form";
import { InputText } from "../../../components/inputs/InputText";
import { IRepository } from "../../../core/Base/repositories/IRepository";
import { asientosRepository } from "../../../core/Asientos/asiento.api";

export interface CreateEditProp<T> {
  element: T;
  repository: IRepository<T>;
}

export const CreateEdit = ({
  element,
  repository,
  idSala,
  ...modalProps
}: ModalProps & CreateEditProp<Asiento> & { idSala: number | string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<Asiento>({
    resolver: zodResolver(AsientoSchema),
    defaultValues: { ...element }, // Cambiado a defaultValues
  });

  const cerrar = () => {
    reset();
    modalProps.onClose();
  };

  const { errors, isValid } = formState;

  async function submitToCreateOrUpdate<T>(
    data: Asiento & { id?: string | number }
  ) {
    try {
      if (element.id !== undefined) {
        console.log("edit");
        const { id, ...rest } = data;
        await asientosRepository.edit(element.id, rest, {}, idSala);
        toast.success("Se ha eliminado exitosamente");
        return;
      }
      await asientosRepository.add(data, {}, idSala);
      toast.success("Se ha agregado exitosamente");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Error Inesperado");
      throw e;
    }
  }

  const onSubmit = async (data: Asiento) => {
    try {
      setIsLoading(true);
      await submitToCreateOrUpdate<Asiento>(data);
      cerrar();
    } catch (e) {
      toast.error("Error al guardar el asiento."); // Manejo de errores
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Gestionar Asiento"
      {...modalProps}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      {...{ isValid: !isValid }}
      onClose={cerrar}
    >
      {JSON.stringify(errors)}
      <div className="p-2.5">
        <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <InputText
            name="estado"
            placeholder="Escriba el estado (activo/inactivo)"
            error={errors.estado}
            label="Estado"
            register={register}
          />

          <InputText
            name="categoriaId"
            placeholder="Escriba el ID de la categoría"
            error={errors.categoriaId}
            label="Categoría ID"
            register={register}
          />

          <InputText
            name="salaId"
            placeholder="Escriba el ID de la sala"
            error={errors.salaId}
            label="Sala ID"
            register={register}
          />

          <InputText
            name="categoriaNombre"
            placeholder="Escriba el nombre de la categoría (opcional)"
            error={errors.categoriaNombre}
            label="Nombre de Categoría"
            register={register}
          />

          <InputText
            name="fila"
            placeholder="Escriba la fila del asiento"
            error={errors.fila}
            label="Fila"
            register={register}
          />

          <InputText
            name="columna"
            placeholder="Escriba la columna del asiento"
            error={errors.columna}
            label="Columna"
            register={register}
          />

          <InputText
            name="coordenadaX"
            placeholder="Coordenada X (opcional)"
            type="number" // Cambiar a número si es necesario
            error={errors.coordenadaX}
            label="Coordenada X"
            register={register}
          />

          <InputText
            name="coordenadaY"
            placeholder="Coordenada Y (opcional)"
            type="number" // Cambiar a número si es necesario
            error={errors.coordenadaY}
            label="Coordenada Y"
            register={register}
          />
        </div>
      </div>
    </Modal>
  );
};
