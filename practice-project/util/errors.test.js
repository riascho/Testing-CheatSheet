import { it, expect, describe } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("class HttpError", () => {
  const testStatusCode = 200;
  const testMessage = "OK";
  const testData = { data: { key: "Test" } };
  const result = new HttpError(testStatusCode, testMessage, testData);
  it("should have a statusCode, message and data property", () => {
    expect(result).toHaveProperty("statusCode");
    expect(result).toHaveProperty("message");
    expect(result).toHaveProperty("data");
  });
  it("should initialize with the correct `statusCode`, `message`, and `data` properties", () => {
    expect(result.statusCode).toBe(testStatusCode);
    expect(result.message).toBe(testMessage);
    expect(result.data).toBe(testData);
  });
  it("data should be undefined if not provided in input", () => {
    const testStatusCode = 200;
    const testMessage = "OK";
    const result = new HttpError(testStatusCode, testMessage);
    expect(result.data).toBeUndefined();
  });
  it("should throw an error if any of the required arguments are missing", () => {}); // not really needed, just for practice
});

describe("class ValidationError", () => {
  const testMessage = "OK";
  const result = new ValidationError(testMessage);
  it("should have a message property", () => {
    expect(result).toHaveProperty("message");
  });
  it("should initialize with the correct `message` property.", () => {
    expect(result.message).toBe(testMessage);
  });
  it("should throw an error if the `message` argument is missing", () => {}); // not really needed, just for practice
});
