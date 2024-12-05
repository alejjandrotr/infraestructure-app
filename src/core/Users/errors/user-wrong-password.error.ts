export class UserWrongPasswordError extends Error{

  constructor(){
    super("Contraseña Incorrecta");
  }
}