
import { List } from './components/list';
import { CreateEditSala } from './components/create-edit';
import { useState } from 'react';
import { createNewSala, Sala } from '../../core/Sala/sala';
import FilterListSala from './components/filter';
import { SearchComponent } from '../../components';
import { FilterProvider, useFilter } from '../../context/filter.context';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const SalasAdminPage = () => (
  <FilterProvider>
    <SalasAdmin />
  </FilterProvider>
);
const SalasAdmin = () => {
  const [isOpen, setIsOpenModal] = useState(false);
  const [editElement, setEdtiElement] = useState<Sala>(createNewSala());

  const { setFilter } = useFilter();

  const edit = (e: Sala) => {
    setEdtiElement(e);
    setIsOpenModal(true);
  };

  return (
    <>
      <Breadcrumb pageName="Salas" />

      <SearchComponent
        onAdd={() => {
          setEdtiElement(createNewSala());
          setIsOpenModal(true);
        }}
        title="Salas"
        onSearch={(data) => {
          setFilter(data);
        }}
      >
        <FilterListSala  onSearch={(data) => {
          setFilter(data);
        }} />
      </SearchComponent>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <List {...{ edit }} />

        <CreateEditSala
          isOpen={isOpen}
          onClose={() => {
            setTimeout(() => setIsOpenModal(false), 100);
          }}
          sala={editElement}
        />
      </div>
    </>
  );
};

export default SalasAdminPage;
