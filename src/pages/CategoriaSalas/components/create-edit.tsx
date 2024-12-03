import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal, { ModalProps } from '../../../components/modals/form.modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/InputText';
import {
  CategoriaSala,
  CategoriaSalaSchema,
} from '../../../core/CategoriaSala/categoria-sala';
import { categoriaSalaRepository } from '../../../core/CategoriaSala/categoria-sala.api';

export const CreateEdit = ({
  categoriaSala,
  ...modalProps
}: ModalProps & { categoriaSala: CategoriaSala }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<CategoriaSala>({
    resolver: zodResolver(CategoriaSalaSchema),
    values: { ...categoriaSala },
  });

  const cerrar = () => {
    reset();
    modalProps.onClose();
  };

  const { errors, isValid } = formState;

  const onSubmit = async (data: CategoriaSala) => {
    try {
      if (data.id !== undefined) {
        const { id, ...rest } = data;
        categoriaSalaRepository.edit(id, rest);
        return cerrar();
      }
      categoriaSalaRepository.add(data);
      return cerrar();
    } catch (e: any) {
      console.log(e);
      toast.error(e.response?.data?.message || 'Error Inesperado');
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Gestionar Sala"
      {...modalProps}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      {...{ isValid: !isValid }}
      onClose={cerrar}
    >
      <div className="p-2.5">
        <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="w-full">
            <InputText
              name="nombre"
              placeholder="Escriba el nombre  de la categoria sala"
              error={errors.nombre}
              label="Código"
              {...{ register }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
