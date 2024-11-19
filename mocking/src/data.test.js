import { it, expect, describe, vi } from "vitest";
// in jest we would import the jest object - https://jestjs.io/docs/jest-object
import { generateReportData } from "./data";

describe("generateReportData()", () => {
  it("should call function if one was provided in argument", () => {
    //Arrange

    // vi.fn() is an empty function that keeps track of any execution calls and any arguments provided with it
    const logger = vi.fn();
    // using mockimplementation() function to overwrite mock function
    logger.mockImplementationOnce(() => {});

    // Act
    generateReportData(logger);

    // Assert
    expect(logger).toBeCalled();

    // other useful assertions on spies:
    // expect(logger).toBeCalledWith(); // has to be called with specific argument
    // expect(logger).toBeCalledTimes(); // has to be called certain number of times
  });
});
