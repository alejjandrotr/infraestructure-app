import React from "react";
import { Column } from "../dtos/column.dto";
import { TableCell } from "./table-cell";

interface TableRowProps {
  obj: Record<string, any>;
  columns: Column[];
  isLastRow: boolean;
}

const TableRow: React.FC<TableRowProps> = React.memo(
  ({ obj, columns, isLastRow }: TableRowProps) => {
    return (
      <>
        {columns.map((column, index) => (
          <div
            key={`${column.key}-${obj.id || index}`}
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              isLastRow ? "" : "border-b border-stroke dark:border-strokedark"
            }`}
          >
            <TableCell {...{ column, obj }} />
          </div>
        ))}
      </>
    );
  }
);

export default TableRow;