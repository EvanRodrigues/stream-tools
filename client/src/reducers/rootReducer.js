import { combineReducers } from "redux";
import isLogged from "./isLogged";
import user from "./user";
import goal from "./goal";
import colors from "./colors";
import isFetched from "./isFetched";

const rootReducer = combineReducers({
    isLogged,
    user,
    goal,
    colors,
    isFetched,
});

export default rootReducer;
