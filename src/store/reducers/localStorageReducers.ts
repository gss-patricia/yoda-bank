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
        const yoToken = localStorage.getItem("yoToken");
        if (yoToken === null) {
          return null;
        }
        state.yoToken = JSON.parse(yoToken);
        return state.yoToken;
      } catch (error) {
        return null;
      }
    case LocalStorageActions.SAVE:
      try {
        const serializedState = JSON.stringify(action.state);
        localStorage.setItem("yoToken", serializedState);
      } catch (error) {
        console.log(error);
      }
      try {
        if (action.state !== null) state.yoToken = action.state;
        return state.yoToken;
      } catch (error) {
        console.error(error);
      }

    default:
      break;
  }
  return state;
};
export default localStorageReducers;
