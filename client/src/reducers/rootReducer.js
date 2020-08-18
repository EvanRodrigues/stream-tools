import { combineReducers } from "redux";
import isLogged from "./isLogged";
import user from "./user";
import goal from "./goal";
import color from "./color";
import isFetched from "./isFetched";

const rootReducer = combineReducers({
    isLogged,
    user,
    goal,
    color,
    isFetched,
});

export default rootReducer;
