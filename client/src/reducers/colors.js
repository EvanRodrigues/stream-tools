const colors = (
    state = {
        textColor: "#000000",
        backgroundColor: "#e6e6e6",
        layerOneColor: "#00ff00",
        layerTwoColor: "#ff3333",
        layerThreeColor: "#cc00ff",
    },
    action
) => {
    switch (action.type) {
        case "SET_COLORS":
            return action.payload;
        case "SET_TEXT_COLOR":
            return { ...state, textColor: action.payload };
        case "SET_BACKGROUND_COLOR":
            return { ...state, backgroundColor: action.payload };
        case "SET_LAYER_ONE_COLOR":
            return { ...state, layerOneColor: action.payload };
        case "SET_LAYER_TWO_COLOR":
            return { ...state, layerTwoColor: action.payload };
        case "SET_LAYER_THREE_COLOR":
            return { ...state, layerThreeColor: action.payload };
        default:
            return state;
    }
};

export default colors;
