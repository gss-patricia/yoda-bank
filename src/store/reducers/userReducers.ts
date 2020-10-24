import { AnyAction } from "redux";
import UserActions from "../actions/UserActions";

const initialState = {
  uuid: "",
  user: "",
  email: "",
  profile: "",
  saldo: 0,
  extrato: [
    {
      descricaoOperacao: "DEPOSITO",
      id: 0,
      tipo: "DEPOSITO",
      valor: 0,
      timestamp : {
        day: 0,
        month: 0,
        year: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
  ]
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
    case UserActions.GET_USER:
      return state;
    case UserActions.SET_USER:
      state = { ...state, ...action.payload?.user };
      return state;
    case UserActions.SET_SALDO:
      state = { ...state, ...action.payload?.saldo };
      return state;
    case UserActions.SET_EXTRATO:
      state = { ...state, ...action.payload?.extrato };
      return state;
    default:
      break;
  }
  return state;
};
export default userReducers;
