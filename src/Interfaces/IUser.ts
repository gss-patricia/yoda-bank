export enum EPerfil {
  ADMIN,
  USER,
}
export default interface IUser {
  uuid?: string;
  cnpj: string;
  email: string;
  nome: string;
  perfil: string;
  senha: string;
}
