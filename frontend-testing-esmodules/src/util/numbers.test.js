import { it, expect, describe } from "vitest";
import { sanitizeNumbers, transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  it("should return numeric number from given numeric string input", () => {
    const input = "1";
    const expectedResult = 1;
    const result = transformToNumber(input);
    expect(result).toBe(expectedResult);
  });

  it("should return NaN if no input arguments provided", () => {
    const resultFunction = () => transformToNumber();
    expect(resultFunction).toBeNaN;
  });

  it("should return NaN if invalid input provided", () => {
    const invalidInput = "four";
    const result = transformToNumber(invalidInput);
    expect(result).toBeNaN;
  });

  it("should return 0 if input is not string", () => {
    const input1 = [];
    const input2 = null;
    const expectedResult = 0;
    const result1 = transformToNumber(input1);
    expect(result1).toBe(expectedResult);
    const result2 = transformToNumber(input2);
    expect(result2).toBe(expectedResult);
  });
});

describe("sanitizeNumbers()", () => {
  it("should return numbers array from numeric strings array", () => {
    const input = ["1", "2"];
    const expectedResult = input.map((stringNumber) => Number(stringNumber));
    const result = sanitizeNumbers(input);
    expect(result).toEqual(expectedResult);
  });
  it("should throw error if input array contains at least one empty string", () => {
    const invalidInput1 = ["1", ""];
    const invalidInput2 = [""];
    const resultFunction1 = () => sanitizeNumbers(invalidInput1);
    expect(resultFunction1).toThrowError();
    const resultFunction2 = () => sanitizeNumbers(invalidInput2);
    expect(resultFunction2).toThrowError();
  });
});
