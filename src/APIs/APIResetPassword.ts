import IResetPassword from "../Interfaces/IResetPassword";
import baseURL from "./baseURL";

export const RESET_PASSWORD = (body: IResetPassword) => {
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