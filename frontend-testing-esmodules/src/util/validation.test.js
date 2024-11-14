import { it, expect, describe } from "vitest";

import { validateStringNotEmpty } from "./validation";

describe("validateStringNotEmpty()", () => {
  // happy path
  it("should throw 'must not be empty' error if input value is empty", () => {
    const input = "";
    const resultFunction = () => validateStringNotEmpty(input);
    expect(resultFunction).toThrowError(/must not be empty/);
  });

  // unhappy path
  it("should throw 'not a function' error if input is not string", () => {
    const input = 345;
    const resultFunction = () => validateStringNotEmpty(input);
    expect(resultFunction).toThrowError(/is not a function/);
  });

  it("should throw 'cannot read properties of undefined' error if no input argument provided", () => {
    const resultFunction = () => validateStringNotEmpty();
    expect(resultFunction).toThrowError(/Cannot read properties of undefined/);
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
