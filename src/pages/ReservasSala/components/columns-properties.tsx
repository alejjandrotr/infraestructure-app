import { EditButton } from '../../../components/buttons/edit-button';
import { RemoveButton } from '../../../components/buttons/remove-button';
import { Column } from '../../../components/tables/table-crud/dtos/column.dto';
import { VerAsientosButton } from '../../Salas/components/columns-properties';


export const columnsProperties: (
  edit: (e: any) => void,
  deleteFn: (e: any) => void,
  verAsientos: (e: any) => void
) => Column[] = (edit, deleteFn, verAsientos) => [
  {
    key: 'sala.codigo',
    title: 'SALA',
  },
  {
    key: 'fechaInicio',
    title: 'Fecha Inicio',
  },
  {
    key: 'fechaFin',
    title: 'Fecha Fin',
  },
  {
    key: 'options',
    title: 'Opciones',
    component(element: unknown) {
      return (
        <>
          <VerAsientosButton onClick={() =>  verAsientos(element)} />
          <EditButton onClick={() =>  edit(element)} />
          <RemoveButton onClick={() => deleteFn(element)} />
        </>
      );
    },
  },
];

