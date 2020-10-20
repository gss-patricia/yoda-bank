export const baseURL = "http://localhost:8080"; //TODO: Atualizar a baseURL após publicação da api
import IUser from "../Interfaces/IUser";

export const USER_CREATE = (body: IUser) => {
  return {
    url: baseURL + "/register",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };
};
