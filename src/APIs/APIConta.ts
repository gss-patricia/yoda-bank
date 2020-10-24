import IUser from "../Interfaces/IUser";
import baseURL from "./baseURL";

export const CREATE_CONTA = (body: IUser) => {
  return {
    url: baseURL + "/conta",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
};

export const GET_ALL_CONTAS = (
  page: number = 0,
  size: number = 25,
  yoToken: string
) => {
  return {
    url: baseURL + `/conta?page=${page}&size=${size}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yoToken,
      },
    },
  };
};

export const GET_CONTA = (uuid: string, yoToken: string) => {
  return {
    url: baseURL + `/conta/${uuid}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yoToken,
      },
    },
  };
};

export const GET_EXTRATO = (uuid: string, yoToken: string, startDate: string, endDate : string) => {
  return {
    url: baseURL + `/conta/${uuid}/extrato?inicio=${startDate}%2000%3A00%3A00&fim${endDate}%2000%3A00%3A00`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yoToken,
      },
    },
  };
};

export const GET_OPERACAO = (uuid: string, yoToken: string) => {
  return {
    url: baseURL + `/conta/${uuid}/operacao`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yoToken,
      },
    },
  };
};

export const GET_SALDO = (uuid: string, yoToken: string) => {
  return {
    url: baseURL + `/conta/${uuid}/saldo`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + yoToken,
      },
    },
  };
};
