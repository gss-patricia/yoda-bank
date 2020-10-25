import { GET_EXTRATO, GET_SALDO } from "../APIs/APIConta";
import UserAction from "../store/actions/UserActions";
import { ExtratoConta } from "../store/reducers/userReducers";

const fetchSaldo = async (uuid: string, token: string) => {
  const { url, options } = GET_SALDO(uuid, token);
  const response = await fetch(url, options);
  const json = await response.json();

  if (response?.ok) {
    return {
      type: UserAction.SET_SALDO,
      payload: {
        saldo: json.saldo,
      },
    };
  }
};

const fetchExtrato = async (uuid: string, token: string, page: number = 0) => {
  const startDate = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() - 15);
  const { url, options } = GET_EXTRATO(uuid, token, page);
  const response = await fetch(url, options);
  const json = await response.json();
  if (response?.ok) {
    return {
      type: UserAction.SET_EXTRATO,
      payload: {
        extrato: json.content.map((extrato: ExtratoConta) => extrato),
      },
    };
  }
};

export const actions = {
  getSaldo: (uuid: string, token: string) => fetchSaldo(uuid, token),
  getExtrato: (uuid: string, token: string, page: number) =>
    fetchExtrato(uuid, token, page),
};
