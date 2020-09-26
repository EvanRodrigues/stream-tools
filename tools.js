const validateName = (nameInput) => {
    if (!nameInput) return false;
    if (typeof nameInput != "string") return false;
    return nameInput.length > 0;
};

const validateDollars = (dollarInput) => {
    const validCharsRegex = /^([0-9.]*)$/;

    if (dollarInput == null || !validCharsRegex.test(dollarInput)) return false;

    try {
        //check if input is a number
        dollarInput = parseFloat(dollarInput);
        dollarInput = dollarInput.toFixed(2);
    } catch (err) {
        return false;
    }

    const dollarRegex = /^\d+\.\d\d$/;
    return dollarRegex.test(dollarInput);
};

const validateColor = (color) => {
    if (color == null) return false;

    const colorRegex = /^\#([(a-f|\d)]{6}|[(a-f|\d)]{3})$/;

    return colorRegex.test(color);
};

const validateColors = (colorInput) => {
    if (!colorInput) return false;

    try {
        if (!validateColor(colorInput["textColor"])) return false;
        if (!validateColor(colorInput["backgroundColor"])) return false;
        if (!validateColor(colorInput["layerOneColor"])) return false;
        if (!validateColor(colorInput["layerTwoColor"])) return false;
        if (!validateColor(colorInput["layerThreeColor"])) return false;
    } catch (err) {
        return false;
    }

    return true;
};

module.exports = {
    validateName,
    validateDollars,
    validateColor,
    validateColors,
};
