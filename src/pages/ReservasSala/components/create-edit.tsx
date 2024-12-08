import { useState } from "react";
import Modal, { ModalProps } from "../../../components/modals/form.modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IRepository } from "../../../core/Base/repositories/IRepository";
import { submitToCreateOrUpdate } from "../../../core/utils/submit-create-update";
import {
  ReservaSala,
  ReservaSalaSchema,
} from "../../../core/ReservaSala/reserva-sala";
import { DateTimeInput } from "../../../components/inputs/date-time.input";
import useOptionsForSelect from "../../../core/hooks/options.hook";
import { salaRepository } from "../../../core/Sala/sala.api";
import SelectCRUD from "../../../components/select/select-crud";

export interface CreateEditProp<T> {
  element: T;
  repository: IRepository<T>;
}
export const CreateEdit = ({
  element,
  repository,
  ...modalProps
}: ModalProps & CreateEditProp<ReservaSala>) => {
  const { data: salaOptions } = useOptionsForSelect(salaRepository);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, reset, getValues } =
    useForm<ReservaSala>({
      resolver: zodResolver(ReservaSalaSchema),
      values: {
        ...element,
        fechaInicio: element.fechaInicio.toISOString().slice(0, 16) as unknown as Date,
        fechaFin: element.fechaFin.toISOString().slice(0, 16) as unknown as Date,
      },
    });
  const cerrar = () => {
    reset();
    modalProps.onClose();
  };

  const { errors, isValid } = formState;

  const onSubmit = async (data: ReservaSala) => {
    try {
      setIsLoading(true);
      await submitToCreateOrUpdate<ReservaSala>(data, repository);
      cerrar();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Gestionar Reservas"
      {...modalProps}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      {...{ isValid: !isValid || isLoading }}
      onClose={cerrar}
    >
      <div className="p-2.5">
        <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <DateTimeInput
            label="Fecha de Inicio"
            name="fechaInicio"
            register={register}
            defaultValue={element.fechaInicio}
            error={errors.fechaInicio}
          />

          <DateTimeInput
            label="Fecha de Fin"
            name="fechaFin"
            register={register}
            error={errors.fechaFin}
            defaultValue={element.fechaFin}
          />
          <SelectCRUD
            name="idSala"
            placeholder="Selecciones la sala"
            error={errors.idSala}
            label="Categoria de la Sala"
            type="number"
            selectedOption={getValues().idSala}
            isOptionSelected={!errors.idSala}
            options={salaOptions}
            valueAsNumber={true}
            {...{ register }}
          />
        </div>
      </div>
    </Modal>
  );
};
