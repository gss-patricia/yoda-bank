import { AnyAction } from "redux";
import UserActions from "../actions/UserActions";

const initialState = {
  user: "",
  email: "",
  profile: "",
};

export interface UserState {
  user: string;
  email: string;
  profile: string;
}

const userReducers = (state: UserState = initialState, action: AnyAction) => {
  switch (action.type) {
    case UserActions.GET_USER:
      return state;
    case UserActions.SET_USER:
      state = { ...state, ...action.payload.user };
      return state;
    default:
      break;
  }
  return state;
};
export default userReducers;
