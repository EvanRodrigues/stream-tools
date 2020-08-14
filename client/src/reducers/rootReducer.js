import { combineReducers } from "redux";
import isLogged from "./isLogged";
import user from "./user";

const rootReducer = combineReducers({
    isLogged,
    user,
});

export default rootReducer;
