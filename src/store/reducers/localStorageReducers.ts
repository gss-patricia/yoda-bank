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
    case LocalStorageActions.GET:
      return state;
    case LocalStorageActions.LOAD_LOCAL_STORAGE:
      try {
        const yoToken = localStorage.getItem("yoToken");
        if (yoToken === null) {
          return null;
        }
        state = { ...state, yoToken: JSON.parse(yoToken) };
        return state;
      } catch (error) {
        return null;
      }
    case LocalStorageActions.SAVE_LOCAL_STORAGE:
      try {
        const serializedState = JSON.stringify(action.state);        
        localStorage.setItem("yoToken", serializedState);
        state = {...state, yoToken: action.state};
        return state;
      } catch (error) {
        console.log(error);
        return null;
      }

    case LocalStorageActions.REMOVE_LOCAL_STORAGE:
      try {
        localStorage.removeItem("yoToken");
        state = initalState;
      } catch (error) {
        return null;
      }
    default:
      break;
  }
  return state;
};
export default localStorageReducers;
