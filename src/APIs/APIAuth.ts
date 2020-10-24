import ILogin from "../Interfaces/ILogin";
import baseURL from "./baseURL";

export const AUTHENTICATE = (body: ILogin) => {
  return {
    url: baseURL + "/authenticate",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};
