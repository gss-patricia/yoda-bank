import IUser from "../Interfaces/IUser";
export const baseURL = "https://beertech-banco-lupulo.herokuapp.com";

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

export const GET_CONTA = (uuid: string) => {
  return {
    url: baseURL + `/conta/${uuid}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};

export const GET_EXTRATO = (uuid: string) => {
  return {
    url: baseURL + `/conta/${uuid}/extrato`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};

export const GET_OPERACAO = (uuid: string) => {
  return {
    url: baseURL + `/conta/${uuid}/operacao`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};

export const GET_SALDO = (uuid: string) => {
  return {
    url: baseURL + `/conta/${uuid}/saldo`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
};
