import { useState, ReactNode } from 'react';
import { AddButton } from '../buttons/add-button';

interface SearchComponentProps {
  title: string;
  children?: ReactNode;
  onSearch: (searchTerm: string) => void;
  onAdd: () => void;
}

export const SearchComponent = ({
  children,
  onSearch,
  onAdd,
}: SearchComponentProps) => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearchMode = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex mb-4 items-center">
      <div className="flex-1 w-32 mr-2">
        
        {isAdvancedSearch ? (
          <>{children}</>
        ) : (
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Buscar
            </button>
          </form>
        )}
      </div>
      
      {children && (
        <button
          onClick={toggleSearchMode}
          className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          {isAdvancedSearch ? 'Búsqueda Normal' : 'Búsqueda Avanzada'}
        </button>
      )}
      <div className="flex-initial">
        <AddButton onClick={onAdd} title="Salas" />
      </div>
    </div>
  );
};

export default SearchComponent;
