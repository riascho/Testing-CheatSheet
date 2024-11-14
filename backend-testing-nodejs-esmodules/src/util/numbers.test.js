import { it, expect, describe } from "vitest";
import { transformToNumber } from "./numbers";

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
