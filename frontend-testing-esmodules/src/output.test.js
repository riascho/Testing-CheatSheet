import { it, expect, describe } from "vitest";
import { generateOutput } from "./output";

describe("generateOutput()", () => {
  it("should always return a string", () => {
    // Arrange
    const numberInput = 1;
    const invalidString = "invalid";
    const booleanInput = false;
    // Act
    const resultNumberInput = generateOutput(numberInput);
    const resultInvalidString = generateOutput(invalidString);
    const resultBooleanInput = generateOutput(booleanInput);
    // Assert
    expect(resultNumberInput).toBeTypeOf("string");
    expect(resultInvalidString).toBeTypeOf("string");
    expect(resultBooleanInput).toBeTypeOf("string");
  });
  it("should return a single numeric string if input is valid", () => {
    // Arrange
    const validInput = "25";
    const expectedResult = "Result: " + validInput;
    // Act
    const result = generateOutput(validInput);
    // Assert
    expect(result).toBe(expectedResult);
  });
  it('should return an empty string if "no-calc" is provided as a result', () => {
    const input = "no-calc";
    const expectedResult = "";
    const result = generateOutput(input);
    expect(result).toBe(expectedResult);
  });
  it('should return a string that contains "Invalid" if "invalid" is provided as a result', () => {
    const input = "invalid";
    const expectedResult = "Invalid";
    const result = generateOutput(input);
    expect(result).toContain(expectedResult);
  });
});

describe("renderOutput()", () => {
  it("to be tested", () => {});
});
