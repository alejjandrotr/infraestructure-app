import { MockRepository } from './mockRepository'; // Adjust the import path as necessary
import { ApiConfig } from './api-config.interface';
import { RepositoryType } from '../enums/RepositoryType';

interface Sala {
  id: string;
  codigo: string;
  capacidad: number;
  largo: number;
  ancho: number;
}

const config: ApiConfig = {
  path: 'salas',
  type: RepositoryType.MOCK,
};

describe('MockRepository', () => {
  const repository = new MockRepository<Sala>(config);

  test('should add a new item', async () => {
    const newSala = () =>
      ({
        id: '1',
        codigo: 'A',
        capacidad: 100,
        largo: 20,
        ancho: 10,
      });

    const addedSala = await repository.add(newSala());
    expect(addedSala).toEqual(newSala());

    const currentData = await repository.get();
    expect(currentData).toContainEqual(newSala());
  });

  test('should retrieve an item by ID', async () => {
    const newSala: Sala = {
      id: '2',
      codigo: 'B',
      capacidad: 150,
      largo: 25,
      ancho: 15,
    };

    await repository.add(newSala);

    const retrievedSala = await repository.getById('2');
    expect(retrievedSala).toEqual(newSala);
  });

  test('should edit an existing item', async () => {
    const newSala: Sala = {
      id: '3',
      codigo: 'C',
      capacidad: 200,
      largo: 30,
      ancho: 20,
    };

    await repository.add(newSala);

    const updatedSala = {
      codigo: 'C Updated',
      capacidad: 250,
      largo: 35,
      ancho: 25,
    };

    const editedSala = await repository.edit('3', { ...updatedSala, id: '3' });

    expect(editedSala).toEqual({ id: '3', ...updatedSala });

    const currentData = await repository.get();
    expect(currentData).toContainEqual({ id: '3', ...updatedSala });
  });

  test('should delete an item by ID', async () => {
    const newSala: Sala = {
      id: '4',
      codigo: 'D',
      capacidad: 300,
      largo: 40,
      ancho: 30,
    };

    await repository.add(newSala);

    const remainingSalas = await repository.delete('4');

    expect(remainingSalas).not.toContainEqual(newSala);

    expect(await repository.getById('4')).toBeUndefined();
  });

  test('should throw NotFoundError when deleting non-existent item', async () => {
    await expect(repository.delete('non-existent-id')).rejects.toThrowError(
      /not found/
    );
  });
});
