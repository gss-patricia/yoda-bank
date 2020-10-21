export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";
import IOperation from "../Interfaces/IOperation";

export const OPERATION = (body: IOperation) => {
  return {
    url: baseURL + "/operacao",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };
};
