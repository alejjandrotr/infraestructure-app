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
    const gridColums = columns.length > 4 ? columns.length : 5;

    const rowStyle = {
      gridTemplateColumns: `repeat(${gridColums}, minmax(0, 1fr))`,
    };

    return (
      <>
        <div
          className={`grid  ${
            isLastRow ? "" : "border-b border-stroke dark:border-strokedark"
          }`}
          style={rowStyle}
        >
          {columns.map((column, index) => (
            <TableCell
              key={`${column.key}-${obj.id || index}`}
              {...{ column, obj }}
            />
          ))}
        </div>
      </>
    );
  }
);

export default TableRow;
