import { Column } from '../dtos/column.dto';

export const TableCell = ({
  column,
  obj,
}: {
  column: Column;
  obj: Record<string, any>;
}) => {
  return (
    <div
      className="flex items-center justify-center p-2.5 xl:p-5"
      key={column.key}
    >
      {column.component ? (
        column.component(obj)
      ) : (
        <p className="text-black dark:text-white">{renderValue(column, obj)}</p>
      )}
    </div>
  );
};

const renderValue = (
  column: Column,
  obj: Record<string, any>
): React.ReactNode => {
  return column.onShow ? column.onShow(obj) : getValue(obj, column.key);
};

const getValue = (data: Record<string, any>, key: string): string => {
  const keys = key.split('.');
  const value = keys.reduce(
    (accumulator, currentKey) => accumulator?.[currentKey],
    data
  );
  return formatValue(value);
};

const formatValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value.toString();
  } else if (value instanceof Date) {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Intl.DateTimeFormat('es-ES', options).format(value);
  }
  return '';
};
