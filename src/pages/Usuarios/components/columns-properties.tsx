
import { EditButton } from '../../../components/buttons/edit-button';
import { RemoveButton } from '../../../components/buttons/remove-button';
import { Column } from '../../../components/tables/table-crud/dtos/column.dto';


export const columnsProperties: (
  edit: (e: any) => void,
  deleteFn: (e: any) => void
) => Column[] = (edit, deleteFn) => [
  {
    key: 'codigo',
    title: 'Codigo',
  },
  {
    key: 'capacidad',
    title: 'Capacidad',
  },
  {
    key: 'largo',
    title: 'Largo',
  },
  {
    key: 'ancho',
    title: 'Ancho',
  },

  {
    key: 'options',
    title: 'Opciones',
    component(element: unknown) {
      return (
        <>
          <EditButton onClick={() =>  edit(element)} />
          <RemoveButton onClick={() => deleteFn(element)} />
        </>
      );
    },
  },
];
