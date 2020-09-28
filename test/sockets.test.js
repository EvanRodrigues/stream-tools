const {
    isIdInUse,
    validateDollars,
    validateTokens,
    validateColors,
} = require("../sockets");

test("Tests empty id to NOT pass", () => {
    expect(isIdInUse(null)).toBe(false);
});
