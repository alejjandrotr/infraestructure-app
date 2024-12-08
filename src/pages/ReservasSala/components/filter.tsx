import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useOptionsForSelect from "../../../core/hooks/options.hook";
import { salaRepository } from "../../../core/Sala/sala.api";
import { DateTimeInput } from "../../../components/inputs/date-time.input";
import {
  ReservaSala,
  ReservaSalaFilter,
  ReservaSalaFilterSchema,
} from "../../../core/ReservaSala/reserva-sala";
import SelectCRUD from "../../../components/select/select-crud";

export const FilterList = ({
  onSearch,
}: {
  onSearch: (search: ReservaSala) => void;
}) => {
  const { data: salaOptions } = useOptionsForSelect(salaRepository);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState, getValues } =
    useForm<ReservaSalaFilter>({
      resolver: zodResolver(ReservaSalaFilterSchema),
    });

  const { errors } = formState;
  const onSubmit = async (data: ReservaSalaFilter) => {
    setIsLoading(true);
    await onSearch(data as ReservaSala);
    setIsLoading(false);
  };

  return (
    <form className="p-2.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <DateTimeInput
          label="Fecha de Inicio"
          name="fechaInicio"
          register={register}
          error={errors.fechaInicio}
        />

        <DateTimeInput
          label="Fecha de Fin"
          name="fechaFin"
          register={register}
          error={errors.fechaFin}
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

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className={`px-4 py-2 rounded-md ${
            isLoading
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default FilterList;
