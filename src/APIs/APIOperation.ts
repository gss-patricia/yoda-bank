import baseURL from "./baseURL";
import IOperation from "../Interfaces/IOperation";

export const OPERATION = (body: IOperation, yoToken: string) => {
  return {
    url: baseURL + "/operacao",
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
