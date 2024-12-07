import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sala, SalaFilter, SalaSchemaFilter } from "../../../core/Sala/sala";
import { useForm } from "react-hook-form";
import { InputText } from "../../../components/inputs/InputText";

export const FilterListSala = ({
  onSearch,
}: {
  onSearch: (search: Sala) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<SalaFilter>({
    resolver: zodResolver(SalaSchemaFilter),
    values: {},
  });

  const { errors } = formState;
  const onSubmit = async (data: SalaFilter) => {
    setIsLoading(true);
    await onSearch(data as Sala);
    setIsLoading(false);
  };

  return (
    <form className="p-2.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className="w-full">
          <InputText
            name="codigo"
            placeholder="Código de la sala"
            error={errors.codigo}
            className="border rounded-md p-2 w-full"
            {...{ register }}
          />
        </div>

        <div className="w-full">
          <InputText
            name="capacidad"
            placeholder="Capacidad"
            error={errors.capacidad}
            type="number"
            className="border rounded-md p-2 w-full"
            {...{ register }}
          />
        </div>

        <div className="w-full">
          <InputText
            name="ancho"
            placeholder="Ancho"
            error={errors.ancho}
            type="number"
            className="border rounded-md p-2 w-full"
            {...{ register }}
          />
        </div>

        <div className="w-full">
          <InputText
            name="largo"
            placeholder="Largo"
            error={errors.largo}
            type="number"
            className="border rounded-md p-2 w-full"
            {...{ register }}
          />
        </div>
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

export default FilterListSala;
