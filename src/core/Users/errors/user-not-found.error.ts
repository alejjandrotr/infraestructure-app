export class NotFoundUserError extends Error{

  constructor(){
    super("Usuario no encontrado");
  }
}