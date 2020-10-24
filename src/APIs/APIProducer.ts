import baseURL from "./baseURL";
import IOperation from "../Interfaces/IOperation";

export const PRODUCER_OPERATION = (body: IOperation, yoToken: string) => {
  return {
    url: baseURL + "/producer/operacao",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yoToken,
      },
      body: JSON.stringify(body),
    },
  };
};

export const PRODUCER_TRANSFER = (body: IOperation, yoToken: string) => {
  return {
    url: baseURL + "/producer/transferencia",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yoToken,
      },
      body,
    },
  };
};
