import { GET_SALDO } from "../APIs/APIConta";
import UserAction from "../store/actions/UserActions";

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

export const actions = {
  getSaldo: (uuid: string, token: string) => fetchSaldo(uuid, token),
};
