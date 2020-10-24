import baseURL from "./baseURL";
import ITransfer from "../Interfaces/ITransfer";

export const PRODUCER_OPERATION = (body: ITransfer, yoToken: string) => {
  return {
    url: baseURL + "/transferencia",
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
