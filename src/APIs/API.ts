export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";
import IUser from "../Interfaces/IUser";

export const CREATE_CONTA = (body: IUser) => {
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

export const GET_ALL_CONTAS = (page: number = 0, size: number = 25) => {
  return {
    url: baseURL + `/conta?page=${page}&size=${size}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};
