import { GenericList } from "../../components/crud-commons/generic-list";
import { useState } from "react";
import { FilterProvider, useFilter } from "../../context/filter.context";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { columnsProperties } from "./components/columns-properties";
import { userRepository } from "../../core/Users/user.api";
import { Column } from "../../components/tables/table-crud/dtos/column.dto";
import { createNewUser, User } from "../../core/Users/user";
import { SearchComponent } from "../../components";
import FilterList from "./components/filter";
import { CreateEdit } from "./components/create-edit";

const UsersAdminPage = () => (
  <FilterProvider>
    <UsersAdmin />
  </FilterProvider>
);
const UsersAdmin = () => {
  const [isOpen, setIsOpenModal] = useState(false);
  const [editElement, setEdtiElement] = useState<User>(createNewUser());

  const { setFilter } = useFilter();

  const edit = (e: User) => {
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

      <SearchComponent
        onAdd={() => {
          setEdtiElement(createNewUser());
          setIsOpenModal(true);
        }}
        title="Usuarios"
        onSearch={(data) => {
          setFilter(data);
        }}
      >
        <FilterList  onSearch={(data) => {
          setFilter(data);
        }} />
      </SearchComponent>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <GenericList {...{ columns, repository: userRepository }} />
      </div>

      <CreateEdit
          isOpen={isOpen}
          onClose={() => {
            setTimeout(() => setIsOpenModal(false), 100);
          }}
          element={editElement}
          repository={userRepository}
      />
    </>
  );
};

export default UsersAdminPage;
