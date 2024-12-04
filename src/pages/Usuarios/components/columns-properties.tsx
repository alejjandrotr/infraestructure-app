import { EditButton } from "../../../components/buttons/edit-button";
import { RemoveButton } from "../../../components/buttons/remove-button";
import { Column } from "../../../components/tables/table-crud/dtos/column.dto";
import { User } from "../../../core/Users/user"; 

export const columnsProperties: (
  edit: (user: User) => void,
  deleteFn: (user: User) => void
) => Column[] = (edit, deleteFn) => [
  {
    key: "usuario",
    title: "Usuario",
  },
  
  {
    key: "nombre_completo",
    title: "Nombre Completo",
  },
  {
    key: "direccion.pais",
    title: "Pais",
  },
  {
    key: "direccion.estado",
    title: "Estado",
  },
  {
    key: "direccion.ciudad",
    title: "Ciudad",
  },
  {
    key: "options",
    title: "Opciones",
    component(userParams: unknown) {
      const user = userParams as User;
      return (
        <>
          <EditButton onClick={() => edit(user)} />
          <RemoveButton onClick={() => deleteFn(user)} />
        </>
      );
    },
  },
];
