
import { FC } from 'react';
import { EditButton } from '../../../components/buttons/edit-button';
import { OptionButton, OptionButtonProps } from '../../../components/buttons/option-button';
import { RemoveButton } from '../../../components/buttons/remove-button';
import { Column } from '../../../components/tables/table-crud/dtos/column.dto';
import { MdEventSeat } from "react-icons/md";


export const columnsProperties: (
  edit: (e: any) => void,
  deleteFn: (e: any) => void,
  verAsientos: (e: any) => void
) => Column[] = (edit, deleteFn, verAsientos) => [
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
          <VerAsientosButton onClick={() =>  verAsientos(element)} />
          <EditButton onClick={() =>  edit(element)} />
          <RemoveButton onClick={() => deleteFn(element)} />
        </>
      );
    },
  },
];

export const VerAsientosButton: FC<Omit<OptionButtonProps, 'Icon'>> = ({ onClick }) => (
  <OptionButton onClick={onClick} Icon={MdEventSeat } />
);
