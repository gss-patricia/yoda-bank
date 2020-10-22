export enum EPerfil {
  ADMIN,
  USER,
}
export default interface IUser {
  cpf: string;
  email: string;
  nome: string;
  perfil: string;
  senha: string;
}
