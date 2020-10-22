import { combineReducers, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import userReducers from "./reducers/userReducers";
import localStorageReducers from "./reducers/localStorageReducers";

const reducers = combineReducers({ userReducers, localStorageReducers });
export default createStore(reducers, devToolsEnhancer({}));
