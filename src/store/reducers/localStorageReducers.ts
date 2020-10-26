import jwt_decode from "jwt-decode";
import { AnyAction } from "redux";
import IUser from "../../Interfaces/IUser";
import LocalStorageActions from "../actions/LocalStorageActions";

const initalState = {
  yoToken: "",
  yoUuid: "",
};

export interface StorageState {
  yoToken: string;
  yoUuid: string;
}

const localStorageReducers = (
  state: StorageState = initalState,
  action: AnyAction
) => {
  switch (action.type) {
    case LocalStorageActions.GET:
      return state;
    case LocalStorageActions.LOAD_LOCAL_STORAGE:
      try {
        const yoToken = localStorage.getItem("yoToken");
        const yoUuid = localStorage.getItem("yoUuid");
        if (yoToken === null || yoUuid === null) {
          return null;
        }

        const { uuid, email, cnpj, exp }: IUser = jwt_decode(yoToken);

        if (!uuid || !email || !cnpj || !exp) {
          return null;
        }

        //TODO: Validar a data de expiração com o backend
        // const dataExp = new Date(exp);
        // if (dataExp < new Date()) return null;

        state = {
          ...state,
          yoToken: JSON.parse(yoToken),
          yoUuid: yoUuid,
        };
        return state;
      } catch (error) {
        return null;
      }
    case LocalStorageActions.SAVE_LOCAL_STORAGE:
      try {
        if (action.state) {
          const serializedState = JSON.stringify(action.state);
          localStorage.setItem("yoToken", serializedState);

          const { uuid }: IUser = jwt_decode(serializedState);

          const yoUuid = String(uuid);

          localStorage.setItem("yoUuid", yoUuid);
          state = { ...state, yoToken: action.state, yoUuid: yoUuid };
        }
        return state;
      } catch (error) {
        console.log(error);
        return null;
      }

    case LocalStorageActions.REMOVE_LOCAL_STORAGE:
      try {
        localStorage.removeItem("yoToken");
        localStorage.removeItem("yoUuid");
        state = initalState;
      } catch (error) {
        return null;
      }
  }
  return state;
};
export default localStorageReducers;
