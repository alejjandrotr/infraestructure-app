import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal, { ModalProps } from '../../../components/modals/form.modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sala, SalaSchema } from '../../../core/Sala/sala';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/InputText';
import { salaRepository } from '../../../core/Sala/sala.api';

export const CreateEditSala = ({
  sala,
  ...modalProps
}: ModalProps & { sala: Sala }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<Sala>({
    resolver: zodResolver(SalaSchema),
    values: { ...sala },
  });

  const cerrar = () => {
    reset();
    modalProps.onClose();
  };

  const { errors, isValid } = formState;
  const onSubmit = async (data: Sala) => {
    try {
      console.log(data);
      if (data.id !== undefined) {
        const { id, ...rest } = data;
        salaRepository.edit(id, rest);
        return cerrar();
      }
      salaRepository.add(data);
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
              name="codigo"
              placeholder="Escriba el codigo de la sala"
              error={errors.codigo}
              label="Código"
              {...{ register }}
            />
          </div>

          <div className="w-full">
            <InputText
              name="capacidad"
              placeholder="Escriba la capacidad de la sala"
              error={errors.capacidad}
              label="Capacidad"
              type="number"
              {...{ register }}
            />
          </div>

          <div className="w-full">
            <InputText
              name="ancho"
              placeholder="Escriba el ancho de la sala"
              error={errors.ancho}
              label="Ancho"
              type="number"
              {...{ register }}
            />
          </div>

          <div className="w-full">
            <InputText
              name="largo"
              placeholder="Escriba el largo de la sala"
              error={errors.largo}
              label="Largo"
              type="number"
              {...{ register }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
