import { useEffect, useState, useCallback } from "react";
import { subscribe, unsubscribe } from "../../core/events";
import { useFilter } from "../../context/filter.context";
import { Column } from "../tables/table-crud/dtos/column.dto";
import TableCrud from "../tables/table-crud/table-crud";
import { IRepository } from "../../core/Base/repositories/IRepository";

interface GenericListProps<T> {
  columns: Column[];
  repository: IRepository<T>;
  updateDataFn?: () => Promise<T[]>;
}

export const GenericList = <T,>({
  columns,
  repository,
  updateDataFn,
}: GenericListProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const { filter } = useFilter();

  const updateData = useCallback(async () => {
    try {
      const fetchedData = updateDataFn
        ? await updateDataFn()
        : await repository.get({ filter: filter as Partial<T> | string });
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [updateDataFn, repository, filter]);

  useEffect(() => {
    updateData();
    const listener = () => updateData();
    subscribe(repository.getConfigPath(), listener);

    return () => {
      unsubscribe(repository.getConfigPath(), listener);
    };
  }, [updateData, repository]);

  return <TableCrud data={data} columns={columns} />;
};
