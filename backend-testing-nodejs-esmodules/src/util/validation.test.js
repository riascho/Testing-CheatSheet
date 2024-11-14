import { it, expect, describe } from "vitest";

import { validateStringNotEmpty } from "./validation";

describe("validateStringNotEmpty()", () => {
  // happy path
  it("should throw 'must not be empty' error if input value is an empty string", () => {
    const shortEmptyString = "";
    const longEmptyString = "     ";
    const isShortEmptyString = () => validateStringNotEmpty(shortEmptyString);
    const isLongEmptyString = () => validateStringNotEmpty(longEmptyString);
    expect(isShortEmptyString).toThrowError(/must not be empty/);
    expect(isLongEmptyString).toThrowError(/must not be empty/);
  });

  // unhappy path
  it("should throw any other error if input is not a string or no input argument provided", () => {
    const notAString = 345;
    const isNotAString = () => validateStringNotEmpty(notAString);
    const hasNoInputArgument = () => validateStringNotEmpty();
    expect(isNotAString).not.toThrowError(/must not be empty/);
    expect(isNotAString).toThrowError();
    expect(hasNoInputArgument).not.toThrowError(/must not be empty/);
    expect(hasNoInputArgument).toThrowError();
  });
  describe("returns true", () => {
    it("should NOT throw an error if input is a non-empty string", () => {
      const validString = "hello world";
      const isValidString = () => validateStringNotEmpty(validString);
      expect(isValidString).not.toThrowError();
      expect(validateStringNotEmpty(validString)).toBeTruthy;
    });
  });
});

import { validateNumber } from "./validation";

describe("validateNumber()", () => {
  // happy path
  it("should throw 'Invalid number input' error if input is NaN or not of type number", () => {
    const invalidString = "two";
    const NaNInput = NaN;
    const isInvalidString = () => validateNumber(invalidString);
    const isAlreadyNaN = () => validateNumber(NaNInput);
    const assertions = [isInvalidString, isAlreadyNaN];
    assertions.forEach((func) => {
      expect(func).toThrowError(/Invalid number input/);
    });
  });

  // unhappy path
  it("should also throw 'Invalid number input' error if no input argument provided", () => {
    const resultFunction = () => validateNumber();
    expect(resultFunction).toThrowError(/Invalid number input/);
  });

  it("should return undefined if input is a valid number or numeric string", () => {
    const validNumber = 6;
    const numericString = "6";
    const result1 = validateNumber(validNumber);
    const result2 = validateNumber(numericString);
    expect(result1).toBeUndefined;
    expect(result2).toBeUndefined;
  });
});
