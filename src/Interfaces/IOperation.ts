export enum ETypeOperation {
  DEPOSITO = "DEPOSITO",
  SAQUE = "SAQUE",
}

export default interface IOperation {
  conta: string;
  tipo: ETypeOperation;
  valor: number;
}
