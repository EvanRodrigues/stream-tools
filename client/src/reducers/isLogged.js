const isLogged = (state = false, action) => {
    switch (action.type) {
        case "LOGOUT":
            return false;
        case "LOGIN":
            return true;
        default:
            return state;
    }
};

export default isLogged;
