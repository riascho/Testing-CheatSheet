import { it, expect, describe } from "vitest";
import { validateNotEmpty } from "./validation";
import { ValidationError } from "./errors";

describe("validateNotEmpty()", () => {
  it("should throw a Validation Error if input is empty string", () => {
    const callValidateNotEmptyWithShortEmptyString = () => validateNotEmpty("");
    expect(callValidateNotEmptyWithShortEmptyString).toThrowError(
      ValidationError
    );
  });
  it("should throw a Validation Error if input is string with spaces", () => {
    const callValidateNotEmptyWithLongEmptyString = () =>
      validateNotEmpty("   ");
    expect(callValidateNotEmptyWithLongEmptyString).toThrowError(
      ValidationError
    );
  });
  it("should throw a Validation Error with the error message provided in the input", () => {
    const errorMessage = "This is the error!";
    const callValidateNotEmptyWithUndefinedButErrorMessage = () =>
      validateNotEmpty(undefined, errorMessage);
    expect(callValidateNotEmptyWithUndefinedButErrorMessage).toThrow(
      errorMessage
    );
    // same:
    // try {
    //   validateNotEmpty(undefined, errorMessage);
    // } catch (err) {
    //   expect(err.message).toBe(errorMessage);
    // }
  });
  it("should take two arguments", () => {});
  it("should take a string as the first argument and throw type error if not", () => {});
});
