import { combineReducers } from "redux";
import isLogged from "./isLogged";
import user from "./user";
import goal from "./goal";
import colors from "./colors";
import loading from "./loading";

const rootReducer = combineReducers({
    loading,
    isLogged,
    user,
    goal,
    colors,
});

export default rootReducer;
