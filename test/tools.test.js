const {
    validateName,
    validateDollars,
    validateColor,
    validateColors,
} = require("../tools");

/*validName Tests*/

test("Validates non empty string to pass", () => {
    expect(validateName("foo")).toBe(true);
});

test("Validates empty string to NOT pass", () => {
    expect(validateName("")).toBe(false);
    expect(validateName(null)).toBe(false);
    expect(validateName()).toBe(false);
});

/*validDollars Tests*/

test("Validates empty dollar amount to NOT pass", () => {
    expect(validateDollars("")).toBe(false);
    expect(validateDollars(null)).toBe(false);
});

test("Validates non-negative input with type Number to pass", () => {
    expect(validateDollars(10.123736)).toBe(true);
    expect(validateDollars(1)).toBe(true);
    expect(validateDollars(0)).toBe(true);
});

test("Validates negative input to NOT pass", () => {
    expect(validateDollars(-10.123736)).toBe(false);
    expect(validateDollars(-1)).toBe(false);
});

test("Validates string input with Number value to pass", () => {
    expect(validateDollars("10.123536")).toBe(true);
    expect(validateDollars("1")).toBe(true);
    expect(validateDollars("0")).toBe(true);
});

test("Validates string input with Non-Number value to pass", () => {
    expect(validateDollars("10.aa3536")).toBe(false);
    expect(validateDollars("foo")).toBe(false);
    expect(validateDollars("#1...")).toBe(false);
});

/*Validate Color Tests*/

test("Validates null value to NOT pass", () => {
    expect(validateColor(null)).toBe(false);
    expect(validateColor("")).toBe(false);
});

test("Validates value with non-hex values to NOT PASS", () => {
    expect(validateColor("#12356g")).toBe(false);
    expect(validateColor("#1ag")).toBe(false);
    expect(validateColor("#12345$")).toBe(false);
    expect(validateColor("#1_3")).toBe(false);
});

test("Validates value not length 4 or 7 to NOT pass", () => {
    expect(validateColor("#1")).toBe(false);
    expect(validateColor("#12")).toBe(false);
    expect(validateColor("#1234567")).toBe(false);
    expect(validateColor("#12345")).toBe(false);
    expect(validateColor("#1234")).toBe(false);
});

test("Validates value with no leading # to NOT pass", () => {
    expect(validateColor("1234567")).toBe(false);
    expect(validateColor("cccc")).toBe(false);
    expect(validateColor("1#23456")).toBe(false);
    expect(validateColor("c#cc")).toBe(false);
});

test("Validates value with proper hex color format to pass", () => {
    expect(validateColor("#fff")).toBe(true);
    expect(validateColor("#ffffff")).toBe(true);
    expect(validateColor("#123")).toBe(true);
    expect(validateColor("#123abc")).toBe(true);
});

/*TODO: Integration tests for a validateColors/full validation*/
