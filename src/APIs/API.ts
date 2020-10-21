export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";
import IUser from "../Interfaces/IUser";

export const USER_CREATE = (body: IUser) => {
  return {
    url: baseURL + "/conta",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };
};
