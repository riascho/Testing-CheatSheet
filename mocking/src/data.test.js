import { it, expect, describe, vi } from "vitest";
// in jest we would import the jest object - https://jestjs.io/docs/jest-object
import { generateReportData } from "./data";

/** export function generateReportData(logFn) {
  const data = 'Some dummy data for this demo app';
  if (logFn) {
    logFn(data);
  }

  return data;
}
*/

describe("generateReportData()", () => {
  it("should call function if one was provided in argument", () => {
    const logger = vi.fn();
    // vi.fn() is an empty function that keeps track of any execution calls and any arguments provided with it
    generateReportData(logger);
    expect(logger).toBeCalled();
    // other useful assertions on spies:
    expect(logger).toBeCalledWith(); // has to be called with specific argument
    expect(logger).toBeCalledTimes(); // has to be called certain number of times
  });
});
