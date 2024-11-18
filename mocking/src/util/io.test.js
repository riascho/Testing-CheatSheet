import { it, describe, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";

vi.mock("fs");

describe("writeData()", () => {
  it("should execute the writeFile() function", () => {
    const testData = "This is test data";
    const testFileName = "test.txt";
    // writeData() returns a promise and will be resolved if successful (but returns nothing)
    // return expect(writeData(testData, testFileName)).resolves.toBeUndefined();

    // when using vi.mock("fs") -> it will no longer return a promise
    // we need to implement test differently: call the function and then see if the mocked module has been called accordingly
    writeData(testData, testFileName);
    expect(fs.writeFile).toBeCalled();
  });
});

/**

function to be tested: 

function writeData(data, filename) {
  const storagePath = path.join(process.cwd(), "data", filename);
  return fs.writeFile(storagePath, data);
}

 */
