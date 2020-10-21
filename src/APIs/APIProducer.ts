export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";
import IOperation from "../Interfaces/IOperation";

export const PRODUCER_OPERATION = (body: IOperation) => {
  return {
    url: baseURL + "/producer/operacao",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };
};

export const PRODUCER_TRANSFER = (body: IOperation) => {
  return {
    url: baseURL + "/producer/transferencia",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };
};
