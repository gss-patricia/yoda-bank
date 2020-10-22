import { AnyAction } from "redux";
import LocalStorageActions from "../actions/LocalStorageActions";

const initalState = {
  yoToken: "",
};

export interface StorageState {
  yoToken: string;
}

const localStorageReducers = (
  state: StorageState = initalState,
  action: AnyAction
) => {
  switch (action.type) {
    case LocalStorageActions.LOAD:
      try {
        const serializedState = localStorage.getItem("yoToken");
        if (serializedState === null) {
          return "";
        }
        return JSON.parse(serializedState);
      } catch (error) {
        return "";
      }
    case LocalStorageActions.SAVE:
      try {
        const serializedState = JSON.stringify(action.state);
        localStorage.setItem("yoToken", serializedState);
      } catch (error) {
        console.log(error);
      }
      return action.state;
    default:
      break;
  }
  return state;
};
export default localStorageReducers;
