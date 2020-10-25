import { GET_SALDO } from "../APIs/APIConta";
import useFetch from "../helpers/Hooks/useFetch";
import UserAction from "../store/actions/UserActions";

export const getSaldo = async (uuid: string, token: string) => async (
  dispatch: any
) => {
  try {
    const { request } = useFetch();
    const { url, options } = GET_SALDO(uuid, token);
    const { response, json } = await request(url, options);
    if (response?.ok) {
      dispatch({
        type: UserAction.SET_SALDO,
        payload: {
          saldo: json.saldo,
        },
      });
    }
  } catch (error) {
    console.log("Failed to get Saldo, error: ", error);
  }
};
