import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-between w-full mb-2">
        <PaginationButton
          label="Primera Página"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        
        <div className="flex items-center">
          {/* Items per page selector */}
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="border rounded-md p-2 mr-4"
          >
            {[5, 10, 20, 50].map((option) => (
              <option key={option} value={option}>
                {option} elementos por página
              </option>
            ))}
          </select>
        </div>

        <PaginationButton
          label="Última Página"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </div>

      {/* Page numbers */}
      <div className="flex space-x-2">
        {pageNumbers.map((number) => (
          <PaginationButton
            key={number}
            label={number.toString()}
            onClick={() => onPageChange(number)}
            active={number === currentPage} // Highlight only the current page
          />
        ))}
      </div>

      <span className="mt-2">
        Página {currentPage} de {totalPages}
      </span>
    </div>
  );
};

const PaginationButton: React.FC<{
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean; // To indicate if this button is for the current page
}> = ({ label, onClick, disabled = false, active = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md ${
        disabled 
          ? 'bg-gray-300 text-gray-500' 
          : active 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-black hover:bg-gray-300'
      }`}
      aria-label={label} // Accessibility improvement
    >
      {label}
    </button>
  );
};

const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1); // Return all pages if total is less than or equal to 5
  }

  if (currentPage < 4) {
    return [1, 2, 3, 4, Math.min(5, totalPages)]; // Ensure it does not exceed total pages
  } else if (currentPage > totalPages - 2) {
    return Array.from({ length: Math.min(5, totalPages) }, (_, index) => totalPages - index).reverse(); // Last few pages
  } else {
    const start = currentPage - 2;
    const end = currentPage + 2;
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
};

export default Pagination;