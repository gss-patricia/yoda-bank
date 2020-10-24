import { AnyAction } from "redux";
import UserActions from "../actions/UserActions";

const initialState = {
  uuid: "",
  user: "",
  email: "",
  profile: "",
  saldo: 0,
};

export interface UserState {
  uuid: string;
  user: string;
  email: string;
  profile: string;
  saldo: number;
}

const userReducers = (state: UserState = initialState, action: AnyAction) => {
  switch (action.type) {
    case UserActions.GET_USER:
      return state;
    case UserActions.SET_USER:
      state = { ...state, ...action.payload?.user };
      return state;
    case UserActions.SET_SALDO:
      state = { ...state, ...action.payload?.saldo };
      return state;
    default:
      break;
  }
  return state;
};
export default userReducers;
