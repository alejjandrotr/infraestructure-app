import { useFilter } from '../../../../context/filter.context';

export const useFilteredData = (data: unknown[]) => {
  const { filter } = useFilter();

  return data;
};