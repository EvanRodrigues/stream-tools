const goal = (
    state = {
        progress: 0,
        target: 0,
        name: "",
        accessToken: "",
        tokenSet: false,
    },
    action
) => {
    switch (action.type) {
        case "SET_GOAL":
            return action.payload;
        case "SET_PROGRESS":
            return { ...state, progress: action.payload };
        case "SET_TARGET":
            return { ...state, target: action.payload };
        case "SET_NAME":
            return { ...state, name: action.payload };
        default:
            return state;
    }
};

export default goal;
