import { GenericList } from "../../components/crud-commons/generic-list";
import { CreateEditSala } from "./components/create-edit";
import { useState } from "react";
import { createNewSala, Sala } from "../../core/Sala/sala";
import FilterListSala from "./components/filter";
import { SearchComponent } from "../../components";
import { FilterProvider, useFilter } from "../../context/filter.context";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { columnsProperties } from "./components/columns-properties";
import { userRepository } from "../../core/Users/user.api";
import { Column } from "../../components/tables/table-crud/dtos/column.dto";

const UsersAdminPage = () => (
  <FilterProvider>
    <UsersAdmin />
  </FilterProvider>
);
const UsersAdmin = () => {
  const [isOpen, setIsOpenModal] = useState(false);
  const [editElement, setEdtiElement] = useState<Sala>(createNewSala());

  const { setFilter } = useFilter();

  const edit = (e: Sala) => {
    setEdtiElement(e);
    setIsOpenModal(true);
  };

  const columns: Column[] = columnsProperties(
    edit,
    userRepository.showDeleteMsg
  );

  return (
    <>
      <Breadcrumb pageName="Users" />

    
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <GenericList {...{ columns, repository: userRepository }} />

      
      </div>
    </>
  );
};

export default UsersAdminPage;
