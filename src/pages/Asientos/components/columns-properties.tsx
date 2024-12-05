import { EditButton } from "../../../components/buttons/edit-button";
import { RemoveButton } from "../../../components/buttons/remove-button";
import { Column } from "../../../components/tables/table-crud/dtos/column.dto";
import { Asiento } from "../../../core/Asientos/asiento";

export const columnsProperties: (
  edit: (element: Asiento) => void,
  deleteFn: (element: Asiento) => void
) => Column[] = (edit, deleteFn) => [
  
  {
    key: "estado",
    title: "Estado",
  },

  {
    key: "fila",
    title: "Fila",
  },
  
  {
    key: "columna",
    title: "Columna",
  },

  {
    key: "options",
    title: "Opciones",
    component(asientoParams: unknown) {
      const asiento = asientoParams as Asiento;
      return (
        <>
          <EditButton onClick={() => edit(asiento)} />
          <RemoveButton onClick={() => deleteFn(asiento)} />
        </>
      );
    },
  },
];
