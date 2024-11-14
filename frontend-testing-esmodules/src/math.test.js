import { it, expect, describe } from "vitest";
import { add } from "./math";

describe("add()", () => {
  it("should summarize all numbers from array input", () => {
    // Arrange
    const numbers = [1, 2, 3, 4, 5];
    const expectedResult = numbers.reduce((prev, curr) => {
      return prev + curr;
    });
    // Act
    const result = add(numbers);
    // Assert
    expect(result).toBe(expectedResult);
  });

  it("should yield NaN if input contains at least one invalid number", () => {
    const invalidNumbers1 = [1, 2, 3, "four"];
    const invalidNumbers2 = ["one", 1, 2, 3];
    const result1 = add(invalidNumbers1);
    expect(result1).toBeNaN();
    const result2 = add(invalidNumbers2);
    expect(result2).toBeNaN();
  });

  it("should yield correct sum if input is numeric string values", () => {
    const stringNumbers = ["1", "2", "3"];
    const expectedResult = stringNumbers.reduce((acc, curr) => {
      return Number(acc) + Number(curr);
    });
    const result = add(stringNumbers);
    expect(result).toBe(expectedResult);
  });

  it("should yield 0 if input is empty array", () => {
    const emptyInputArray = [];
    const result = add(emptyInputArray);
    expect(result).toBe(0);
  });

  it("should throw error if no input provided", () => {
    const resultFunction = () => add();
    expect(resultFunction).toThrowError(TypeError);
  });

  // alternative
  // it("should throw error if no input provided", () => {
  //   try {
  //     add();
  //   } catch (error) {
  //     expect(error).toBeInstanceOf(Error);
  //   }
  // });

  it("should throw error if multiple arguments are passed instead of single array", () => {
    const arg1 = 2;
    const arg2 = 3;
    const resultFunction = () => add(arg1, arg2);
    expect(resultFunction).toThrowError(/is not iterable/);
  });
});
