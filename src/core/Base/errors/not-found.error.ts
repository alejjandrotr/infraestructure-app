export class NotFoundError extends Error {
  constructor(path: string, id: string) {
    super(`The ${path} with id ${id} not found.`);
    this.name = 'NotFoundError';
  }
}
