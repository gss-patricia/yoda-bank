import ITransfer from "../Interfaces/ITransfer";
import baseUrl from "../APIs/baseURL";

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
