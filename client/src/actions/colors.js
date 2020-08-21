export const setColors = (colors) => {
    return {
        type: "SET_COLORS",
        payload: colors,
    };
};

export const setTextColor = (textColor) => {
    return {
        type: "SET_TEXT_COLOR",
        payload: textColor,
    };
};

export const setBackgroundColor = (backgroundColor) => {
    return {
        type: "SET_BACKGROUND_COLOR",
        payload: backgroundColor,
    };
};

export const setLayerOneColor = (layerOneColor) => {
    return {
        type: "SET_LAYER_ONE_COLOR",
        payload: layerOneColor,
    };
};

export const setLayerTwoColor = (layerTwoColor) => {
    return {
        type: "SET_LAYER_TWO_COLOR",
        payload: layerTwoColor,
    };
};

export const setLayerThreeColor = (layerThreeColor) => {
    return {
        type: "SET_LAYER_THREE_COLOR",
        payload: layerThreeColor,
    };
};
