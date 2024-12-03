import { useEffect, useState } from "react";
import { subscribe } from "../../core/events";
import { useFilter } from "../../context/filter.context";
import { Column } from "../tables/table-crud/dtos/column.dto";
import TableCrud from "../tables/table-crud/table-crud";
import { IRepository } from "../../core/Base/repositories/IRepository";

export const GenericList = ({
  columns,
  repository,
}: {
  columns: Column[];
  repository: IRepository<any>;
}) => {
  const [data, setData] = useState<unknown[]>([]);
  const { filter } = useFilter();

  function updateData() {
    repository.get(filter as Partial<unknown> | string).then((data) => {
      setData(data);
    });
  }

  useEffect(() => {
    updateData();
    subscribe(repository.getConfigPath(), () => {
      updateData();
    });
  }, []);

  useEffect(() => {
    updateData();
  }, [filter]);
  return <TableCrud {...{ data, columns }} />;
};
