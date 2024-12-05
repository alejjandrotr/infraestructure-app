import { List } from "./components/list";
import { CreateEditSala } from "./components/create-edit";
import { useState } from "react";
import { createNewSala, Sala } from "../../core/Sala/sala";
import FilterListSala from "./components/filter";
import { SearchComponent } from "../../components";
import { FilterProvider, useFilter } from "../../context/filter.context";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { GenericList } from "../../components/crud-commons/generic-list";
import { columnsProperties } from "./components/columns-properties";
import { useNavigate } from "react-router-dom";
import { salaRepository } from "../../core/Sala/sala.api";
import { Column } from "../../components/tables/table-crud/dtos/column.dto";

const SalasAdminPage = () => (
  <FilterProvider>
    <SalasAdmin />
  </FilterProvider>
);
const SalasAdmin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpenModal] = useState(false);
  const [editElement, setEdtiElement] = useState<Sala>(createNewSala());

  const { setFilter } = useFilter();

  const edit = (e: Sala) => {
    setEdtiElement(e);
    setIsOpenModal(true);
  };

  const columns: Column[] = columnsProperties(
    edit,
    (e) => salaRepository.showDeleteMsg(e),
    (element) => {
      const idSala = element.id;
      navigate(`/sala/${idSala}/asientos`);
    }
  );

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
        <FilterListSala
          onSearch={(data) => {
            setFilter(data);
          }}
        />
      </SearchComponent>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <GenericList {...{ repository: salaRepository, columns: columns }} />

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
