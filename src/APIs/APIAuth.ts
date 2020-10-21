import ILogin from "../Interfaces/ILogin";
export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";

export const AUTHENTICATE = (body: ILogin) => {
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
