import { CreateEdit } from "./components/create-edit";
import { useState } from "react";
import FilterListCategoriaSala from "./components/filter";
import { SearchComponent } from "../../components";
import { FilterProvider, useFilter } from "../../context/filter.context";
import {
  CategoriaSala,
  createNewCategoriaSala,
} from "../../core/CategoriaSala/categoria-sala";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { GenericList } from "../../components/crud-commons/generic-list";
import { categoriaSalaRepository } from "../../core/CategoriaSala/categoria-sala.api";
import { columnsProperties } from "./components/columns-properties";
import { Column } from "../../components/tables/table-crud/dtos/column.dto";

const CategoriasSalasAdminPage = () => (
  <FilterProvider>
    <CategoriaSalasAdmin />
  </FilterProvider>
);
const CategoriaSalasAdmin = () => {
  const [isOpen, setIsOpenModal] = useState(false);
  const [editElement, setEdtiElement] = useState<CategoriaSala>(
    createNewCategoriaSala()
  );

  const { setFilter } = useFilter();

  const edit = (e: CategoriaSala) => {
    setEdtiElement(e);
    setIsOpenModal(true);
  };

  const columns: Column[] = columnsProperties(
    edit,
    categoriaSalaRepository.showDeleteMsg
  );

  return (
    <>
      <Breadcrumb pageName="Salas" />

      <SearchComponent
        onAdd={() => {
          setEdtiElement(createNewCategoriaSala());
          setIsOpenModal(true);
        }}
        title="Categoria Salas"
        onSearch={(data) => {
          setFilter(data);
        }}
      >
        <FilterListCategoriaSala
          onSearch={(data) => {
            setFilter(data);
          }}
        />
      </SearchComponent>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <GenericList
          {...{ edit, repository: categoriaSalaRepository, columns }}
        />

        <CreateEdit
          isOpen={isOpen}
          onClose={() => {
            setTimeout(() => setIsOpenModal(false), 100);
          }}
          categoriaSala={editElement}
        />
      </div>
    </>
  );
};

export default CategoriasSalasAdminPage;
