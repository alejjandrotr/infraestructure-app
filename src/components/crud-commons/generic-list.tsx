import { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "../../core/events";
import { useFilter } from "../../context/filter.context";
import { Column } from "../tables/table-crud/dtos/column.dto";
import TableCrud from "../tables/table-crud/table-crud";
import { IRepository } from "../../core/Base/repositories/IRepository";

export const GenericList = ({
  columns,
  repository,
  updateDataFn,
}: {
  columns: Column[];
  repository: IRepository<any>;
  updateDataFn?: () => Promise<unknown[]>;
}) => {
  const [data, setData] = useState<unknown[]>([]);
  const { filter } = useFilter();

  async function updateData() {
    if (updateDataFn) {
      const data = await updateDataFn();
      setData(data as unknown[]);
      return;
    }
    const extraData = { filter: filter as Partial<unknown> | string };
    repository.get(extraData).then((data) => {
      setData(data);
    });
  }

  useEffect(() => {
    updateData();
    const lintener = () => {
      updateData();
    };
    subscribe(repository.getConfigPath(), lintener);
    return () => {
      unsubscribe(repository.getConfigPath(), lintener);
    };
  }, []);

  useEffect(() => {
    updateData();
  }, [filter]);
  return <TableCrud {...{ data, columns }} />;
};
