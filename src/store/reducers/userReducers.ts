import { AnyAction } from "redux";
import UserActions from "../actions/UserActions";

const initialState = {
  uuid: "",
  user: "",
  email: "",
  profile: "",
  saldo: 0,
  extrato: [],
};

export interface UserState {
  uuid: string;
  user: string;
  email: string;
  profile: string;
  saldo: number;
  extrato: ExtratoConta[];
}

export interface ExtratoConta {
  descricaoOperacao: string;
  id: number;
  tipo: string;
  valor: number;
  timestamp: ExtratoDate;
}

export interface ExtratoDate {
  day: number;
  month: number;
  year: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const userReducers = (state: UserState = initialState, action: AnyAction) => {
  switch (action.type) {
    case UserActions.SET_INITIAL:
      state = { ...initialState };
      return state;
    case UserActions.GET_USER:
      return state;
    case UserActions.SET_USER:
      state = { ...state, ...action.payload?.user };
      return state;
    case UserActions.SET_SALDO:
      state = { ...state, saldo: action.payload?.saldo };
      return state;
    case UserActions.SET_EXTRATO:
      state = { ...state, extrato: action.payload?.extrato };
      return state;
    default:
      break;
  }
  return state;
};
export default userReducers;
