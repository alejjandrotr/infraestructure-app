import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sala, SalaFilter, SalaSchemaFilter } from '../../../core/Sala/sala';
import { useForm } from 'react-hook-form';
import { InputText } from '../../../components/inputs/InputText';
import { CategoriaSala, CategoriaSalaFilter, CategoriaSalaSchema } from '../../../core/CategoriaSala/categoria-sala';

export const FilterList = ({
  onSearch,
}: {
  onSearch: (search: CategoriaSala) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<CategoriaSalaFilter>({
    resolver: zodResolver(CategoriaSalaSchema),
    values: {},
  });

  const { errors } = formState;
  const onSubmit = async (data: CategoriaSalaFilter) => {
    onSearch(data as CategoriaSala);
  };

  return (
    <form className="p-2.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className="w-full">
          <InputText
            name="nombre"
            placeholder="Nombre de la categoria de la sala"
            error={errors.nombre}
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
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default FilterList;
