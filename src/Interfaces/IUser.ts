enum EPerfil {
  ADMIN,
  USER,
}
export default interface IUser {
  cnpj: string;
  email: string;
  nome: string;
  perfil: EPerfil;
  senha: string;
}
