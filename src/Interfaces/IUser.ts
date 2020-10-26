export default interface IUser {
  uuid?: string;
  cnpj: string;
  email: string;
  nome: string;
  senha: string;
  exp?: number;
}
