import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputText } from "../../../components/inputs/InputText";
import { User, UserFilter, UserSchemaFilter } from "../../../core/Users/user";

export const FilterList = ({
  onSearch,
}: {
  onSearch: (search: User) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<UserFilter>({
    resolver: zodResolver(UserSchemaFilter),
    values: {},
  });

  const { errors } = formState;
  const onSubmit = async (data: UserFilter) => {
    setIsLoading(true);
    await onSearch(data as User);
    setIsLoading(false)
  };

  return (
    <form className="p-2.5" onSubmit={handleSubmit(onSubmit)}>
      
      <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <InputText
          name="usuario"
          placeholder="Escriba el nombre de usuario"
          error={errors.usuario}
          label="Nombre de Usuario"
          className="border rounded-md p-2 w-full"
          register={register}
        />

        <InputText
          name="nombre_completo"
          placeholder="Escriba su nombre completo"
          error={errors.nombre_completo}
          label="Nombre Completo"
          className="border rounded-md p-2 w-full"
          register={register}
        />

        <InputText
          name="telefono"
          placeholder="Escriba su número de teléfono (opcional)"
          error={errors.telefono}
          label="Teléfono"
          className="border rounded-md p-2 w-full"
          register={register}
        />

        <InputText
          name="direccion.pais"
          placeholder="Escriba el país"
          error={errors.direccion?.pais}
          label="País"
          className="border rounded-md p-2 w-full"
          register={register}
        />

        <InputText
          name="direccion.estado"
          placeholder="Escriba el estado"
          error={errors.direccion?.estado}
          label="Estado"
          className="border rounded-md p-2 w-full"
          register={register}
        />

        <InputText
          name="direccion.ciudad"
          placeholder="Escriba la ciudad"
          error={errors.direccion?.ciudad}
          label="Ciudad"
          className="border rounded-md p-2 w-full"
          register={register}
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
