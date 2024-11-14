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
