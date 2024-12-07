import { useState } from "react";
import Modal, { ModalProps } from "../../../components/modals/form.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputText } from "../../../components/inputs/InputText";
import { IRepository } from "../../../core/Base/repositories/IRepository";
import { submitToCreateOrUpdate } from "../../../core/utils/submit-create-update";
import { User, UserSchema } from "../../../core/Users/user";

export interface CreateEditProp<T> {
  element: T;
  repository: IRepository<T>;
}
export const CreateEdit = ({
  element,
  repository,
  ...modalProps
}: ModalProps & CreateEditProp<User>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<User>({
    resolver: zodResolver(UserSchema),
    values: { ...element },
  });

  const cerrar = () => {
    reset();
    modalProps.onClose();
  };

  const { errors, isValid } = formState;

  const onSubmit = async (data: User) => {
    try {
      setIsLoading(true);
      await submitToCreateOrUpdate<User>(data, repository);
      cerrar();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Gestionar Usuario"
      {...modalProps}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      {...{ isValid: !isValid || isLoading  }}
      onClose={cerrar}
    >
      <div className="p-2.5">
        <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <InputText
            name="usuario"
            placeholder="Escriba el nombre de usuario"
            error={errors.usuario}
            label="Nombre de Usuario"
            register={register}
          />

          <InputText
            name="contraseña"
            type="password" // Asegúrate de que sea un campo de contraseña
            placeholder="Escriba la contraseña"
            error={errors.contraseña}
            label="Contraseña"
            register={register}
          />

          <InputText
            name="nombre_completo"
            placeholder="Escriba su nombre completo"
            error={errors.nombre_completo}
            label="Nombre Completo"
            register={register}
          />

          <InputText
            name="telefono"
            placeholder="Escriba su número de teléfono (opcional)"
            error={errors.telefono}
            label="Teléfono"
            register={register}
          />

          <InputText
            name="direccion.pais"
            placeholder="Escriba el país"
            error={errors.direccion?.pais}
            label="País"
            register={register}
          />

          <InputText
            name="direccion.estado"
            placeholder="Escriba el estado"
            error={errors.direccion?.estado}
            label="Estado"
            register={register}
          />

          <InputText
            name="direccion.ciudad"
            placeholder="Escriba la ciudad"
            error={errors.direccion?.ciudad}
            label="Ciudad"
            register={register}
          />
        </div>
      </div>
    </Modal>
  );
};
