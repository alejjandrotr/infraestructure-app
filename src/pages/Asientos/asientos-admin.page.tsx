import { GenericList } from "../../components/crud-commons/generic-list";
import { useEffect, useState } from "react";
import { createNewSala, Sala } from "../../core/Sala/sala";
import { FilterProvider, useFilter } from "../../context/filter.context";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { columnsProperties } from "./components/columns-properties";
import { userRepository } from "../../core/Users/user.api";
import { Column } from "../../components/tables/table-crud/dtos/column.dto";
import { createNewUser, User } from "../../core/Users/user";
import { SearchComponent } from "../../components";
import FilterList from "./components/filter";
import { CreateEdit } from "./components/create-edit";
import { Asiento, createNewAsiento } from "../../core/Asientos/asiento";
import { asientosRepository } from "../../core/Asientos/asiento.api";
import { useParams } from "react-router-dom";

const AsientosAdminPage = () => {
  const { idSala } = useParams<{ idSala: string }>();
  return (
    <FilterProvider>
      <AsientosAdmin idSala={idSala || ""} />
    </FilterProvider>
  );
};
const AsientosAdmin = ({ idSala }: { idSala: string }) => {
  const [isOpen, setIsOpenModal] = useState(false);
  const [editElement, setEdtiElement] = useState<Asiento>(createNewAsiento());

  const { setFilter, filter } = useFilter();

  const edit = (e: Asiento) => {
    setEdtiElement(e);
    setIsOpenModal(true);
  };

  const columns: Column[] = columnsProperties(edit, (e: Asiento) => {
    asientosRepository.showDeleteMsg(e, idSala);
  });

  async function updateData() {
    const extraData = { filter: filter as Partial<unknown> | string, idSala };
    const asientos = await asientosRepository.get(extraData).then((data) => {
      return data;
    });
    return asientos;
  }

  return (
    <>
      <Breadcrumb pageName="Asientos" />

      <SearchComponent
        onAdd={() => {
          setEdtiElement(createNewAsiento());
          setIsOpenModal(true);
        }}
        title="Asientos"
        onSearch={(data) => {
          setFilter(data);
        }}
      ></SearchComponent>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {idSala !== "" && (
          <GenericList
            {...{
              columns,
              repository: asientosRepository,
              updateDataFn: updateData,
            }}
          />
        )}
      </div>

      {idSala !== "" && (
        <CreateEdit
          isOpen={isOpen}
          onClose={() => {
            setTimeout(() => setIsOpenModal(false), 100);
          }}
          element={editElement}
          repository={asientosRepository}
          idSala={idSala}
        />
      )}
    </>
  );
};

export default AsientosAdminPage;
