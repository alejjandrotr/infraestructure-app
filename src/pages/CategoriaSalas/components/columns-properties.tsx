import { EditButton } from "../../../components/buttons/edit-button";
import { RemoveButton } from "../../../components/buttons/remove-button";
import { Column } from "../../../components/tables/table-crud/dtos/column.dto";

export const columnsProperties: (
  edit: (e: any) => void,
  deleteFn: (e: any) => void
) => Column[] = (edit, deleteFn) => [
  {
    key: "nombre",
    title: "Nombre",
  },

  {
    key: "options",
    title: "Opciones",
    component(element: unknown) {
      return (
        <>
          <EditButton onClick={() => edit(element)} />
          <RemoveButton onClick={() => deleteFn(element)} />
        </>
      );
    },
  },
];
