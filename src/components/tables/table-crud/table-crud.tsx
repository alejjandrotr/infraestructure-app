import React, { useEffect, useState } from 'react';
import { useFilteredData } from './hooks/table-filter.hook';
import { usePagination } from './hooks/table-pagination.hook';
import Pagination from './components/pagination';
import { Column } from './dtos/column.dto';
import ColumnHeader from './components/column-header';
import TableRow from './components/table-row';

interface TableProps {
  title?: string;
  columns: Column[];
  data: unknown[];
  itemsPerPageOptions?: number[];
}

const TableCrud = ({
  title,
  columns,
  data,
  itemsPerPageOptions = [5, 10, 20],
}: TableProps) => {
  const filteredData = useFilteredData(data);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const {
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
    indexOfLastItem,
    indexOfFirstItem,
  } = usePagination(filteredData.length, itemsPerPage);

  useEffect(() => {
    goToPage(1);
  }, [filteredData.length, itemsPerPage]);

  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    goToPage(1);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {title && (
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
      )}

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          {columns.map((column) => (
            <ColumnHeader key={column.key} title={column.title} />
          ))}
        </div>

        {currentItems.map((obj: any, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              index === currentItems.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={obj.id || index}
          >
            <TableRow
              key={obj.id || index}
              obj={obj}
              columns={columns}
              isLastRow={index === currentItems.length - 1}
            />
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={previousPage}
        onNextPage={nextPage}
        onPageChange={goToPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange} 
        itemsPerPageOptions={itemsPerPageOptions}
      />
    </div>
  );
};

export default TableCrud;
