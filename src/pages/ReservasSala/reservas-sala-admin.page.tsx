import { useState } from "react";
import { SearchComponent } from "../../components";
import { FilterProvider, useFilter } from "../../context/filter.context";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { GenericList } from "../../components/crud-commons/generic-list";
import { columnsProperties } from "./components/columns-properties";
import { useNavigate } from "react-router-dom";
import { salaRepository } from "../../core/Sala/sala.api";
import { Column } from "../../components/tables/table-crud/dtos/column.dto";
import {
  createNewReservaSala,
  ReservaSala,
} from "../../core/ReservaSala/reserva-sala";
import { reservaSalaRespository } from "../../core/ReservaSala/reserva-sala.api";
import { CreateEdit } from "./components/create-edit";
import FilterList from "./components/filter";

const ReservasSalaAdminPage = () => (
  <FilterProvider>
    <ReservaSalaAdmin />
  </FilterProvider>
);
const ReservaSalaAdmin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpenModal] = useState(false);
  const [editElement, setEdtiElement] = useState<ReservaSala>(
    createNewReservaSala()
  );

  const { setFilter } = useFilter();

  const edit = (e: ReservaSala) => {
    setEdtiElement(e);
    setIsOpenModal(true);
  };

  const columns: Column[] = columnsProperties(
    edit,
    (e) => salaRepository.showDeleteMsg(e),
    (element) => {
      const idReserva = element.id;
      navigate(`/reserva/${idReserva}/details`);
    }
  );

  return (
    <>
      <Breadcrumb pageName="Reservas" />

      <SearchComponent
        onAdd={() => {
          setEdtiElement(createNewReservaSala());
          setIsOpenModal(true);
        }}
        title="Reservas"
        onSearch={(data) => {
          setFilter(data);
        }}
      >
        <FilterList
          onSearch={(data) => {
            setFilter(data);
          }}
        />
      </SearchComponent>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <GenericList
          {...{ repository: reservaSalaRespository, columns: columns }}
        />
      </div>
      <CreateEdit
        isOpen={isOpen}
        onClose={() => {
          setTimeout(() => setIsOpenModal(false), 100);
        }}
        element={editElement}
        repository={reservaSalaRespository}
      />
    </>
  );
};

export default ReservasSalaAdminPage;
