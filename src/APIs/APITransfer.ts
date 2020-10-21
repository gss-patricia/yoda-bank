export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";
import ITransfer from "../Interfaces/ITransfer";

export const PRODUCER_OPERATION = (body: ITransfer) => {
  return {
    url: baseURL + "/transferencia",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };
};
