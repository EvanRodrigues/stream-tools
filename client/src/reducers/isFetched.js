const isFetched = (state = false, action) => {
    switch (action.type) {
        case "FETCHED":
            return true;
        case "NOT_FETCHED":
            return false;
        default:
            return state;
    }
};

export default isFetched;
