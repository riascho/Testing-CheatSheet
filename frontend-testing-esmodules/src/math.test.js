import { it, expect } from "vitest";
import { add } from "./math";

it("should summarize all numbers in a given array", () => {
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

it("should yield NaN if at least one invalid number is provided", () => {
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
