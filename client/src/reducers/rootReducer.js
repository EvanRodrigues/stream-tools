import { combineReducers } from "redux";
import isLogged from "./isLogged";
import user from "./user";
import goal from "./goal";
import colors from "./colors";

const rootReducer = combineReducers({
    isLogged,
    user,
    goal,
    colors,
});

export default rootReducer;
