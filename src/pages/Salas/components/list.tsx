import { useEffect, useState } from 'react';
import { Sala } from '../../../core/Sala/sala';
import { columnsProperties } from './columns-properties';
import { salaRepository } from '../../../core/Sala/sala.api';
import { subscribe } from '../../../core/events';
import { ENTITIES_KEYS } from '../../../core/enums/entity-keys';
import { confirmAlert } from 'react-confirm-alert';
import { useFilter } from '../../../context/filter.context';
import { Column } from '../../../components/tables/table-crud/dtos/column.dto';
import TableCrud from '../../..//components/tables/table-crud/table-crud';

export const List = ({ edit }: { edit: (e: Sala) => void }) => {
  const [data, setData] = useState<Sala[]>([]);
  const { filter } = useFilter();
  const columns: Column[] = columnsProperties(edit, deleteFn);

  function updateData() {
    salaRepository.get(filter as Partial<Sala> | string).then((data) => {
      setData(data);
    });
  }

  useEffect(() => {
    updateData();
    subscribe(ENTITIES_KEYS.SALA, () => {
      updateData();
    });
  }, []);

  useEffect(() => {
    updateData();
  }, [filter]);
  return <TableCrud {...{ data, columns }} />;
};

function deleteFn(e: Sala): void {
  if (e.id === undefined) return;

  const options = {
    title: 'Eliminar sala',
    message: '¿Desea eliminar la sala?',
    buttons: [
      {
        label: 'Si',
        onClick: () => salaRepository.delete(e.id || -1),
      },
      {
        label: 'No',
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: 'overlay-custom-class-name',
  };
  confirmAlert(options);
}
