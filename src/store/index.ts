import { combineReducers, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import userReducers from "./reducers/userReducers";

const reducers = combineReducers(userReducers);
export default createStore(reducers, devToolsEnhancer({}));
