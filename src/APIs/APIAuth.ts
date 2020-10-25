import ILogin from "../Interfaces/ILogin";
import baseURL from "./baseURL";
import IResetPassword from "../Interfaces/IResetPassword";

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

export const RESET_PASSWORD = (body: IResetPassword, uuid: string, yoToken: string) => {
  return {
    url: baseURL + `/conta/${uuid}/trocar-senha`,
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