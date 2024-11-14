import { it, expect } from "vitest";
import { validateStringNotEmpty, validateNumber } from "./validation";

// happy path
it("should throw error if input value is empty", () => {
  const input = "";
  const resultFunction = () => validateStringNotEmpty(input);
  expect(resultFunction).toThrowError();
});

// happy path
it("should throw error is input it not a number", () => {
  const input = "two";
  const resultFunction = () => validateNumber(input);
  expect(resultFunction).toThrowError();
});
