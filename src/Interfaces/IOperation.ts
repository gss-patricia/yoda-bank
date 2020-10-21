enum ETypeOperation {
  DEPOSITO,
  SAQUE,
}

export default interface IOperation {
  conta: string;
  tipo: ETypeOperation;
  valor: number;
}
