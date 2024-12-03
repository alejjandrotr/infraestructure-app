import { useEffect, useState } from 'react';
import { Sala } from '../../../core/Sala/sala';
import { columnsProperties } from './columns-properties';
import { salaRepository } from '../../../core/Sala/sala.api';
import { subscribe } from '../../../core/events';
import { ENTITIES_KEYS } from '../../../core/enums/entity-keys';
import { confirmAlert } from 'react-confirm-alert';
import { useFilter } from '../../../context/filter.context';
import { Column } from '../../../components/tables/table-crud/dtos/column.dto';
import TableCrud from '../../../components/tables/table-crud/table-crud';
import { CategoriaSala } from '../../../core/CategoriaSala/categoria-sala';
import { categoriaSalaRepository } from '../../../core/CategoriaSala/categoria-sala.api';

export const List = ({ edit }: { edit: (e: CategoriaSala) => void }) => {
  const [data, setData] = useState<CategoriaSala[]>([]);
  const { filter } = useFilter();
  const columns: Column[] = columnsProperties(edit, deleteFn);

  function updateData() {
    categoriaSalaRepository.get(filter as Partial<CategoriaSala> | string).then((data) => {
      console.log(data)
      setData(data);
    });
  }

  useEffect(() => {
    updateData();
    subscribe(ENTITIES_KEYS.CATEGORIA_SALA, () => {
      updateData();
    });
  }, []);

  useEffect(() => {
    updateData();
  }, [filter]);
  return <TableCrud {...{ data, columns }} />;
};

function deleteFn(e: CategoriaSala): void {
  if (e.id === undefined) return;

  const options = {
    title: 'Eliminar Sala',
    message: '¿Desea eliminar la categoria sala?',
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
