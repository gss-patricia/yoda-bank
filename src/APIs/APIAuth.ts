export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";
import ILogin from "../Interfaces/ILogin";

export const CREATE_CONTA = (body: ILogin) => {
  return {
    url: baseURL + "/authenticate",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    },
  };
};
