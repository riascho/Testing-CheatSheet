import { it, describe, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";

vi.mock("fs"); // mock "fs" to replace with empty function -> just to check if it's being called
// mock "path" with replacement to test for specific function executions details
vi.mock("path", () => {
  return {
    default: {
      join(...args) {
        return args[args.length - 1];
      },
    },
  };
});

describe("writeData()", () => {
  // Arrange:
  const testData = "This is test data";
  const testFileName = "test.txt";
  it("should execute the writeFile() function", () => {
    // Act: call the function
    writeData(testData, testFileName);
    // Assert: and then see if the mocked module has been called accordingly (assertions)
    expect(fs.writeFile).toBeCalled();
    expect(fs.writeFile).toBeCalledWith(testFileName, testData);
  });
  it("should return a promise that resolves to no value if called correctly", () => {
    // writeData() returns a promise and will be resolved if successful (but returns nothing)
    return expect(writeData(testData, testFileName)).resolves.toBeUndefined();
  });
});
