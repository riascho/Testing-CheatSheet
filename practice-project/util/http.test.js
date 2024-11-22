import { it, describe, expect, vi } from "vitest";
import { sendDataRequest } from "./http";

// mocking our own fetch method for testing
const testResponseData = { testKey: "testValue" };
const testFetch = vi.fn((url, payload) => {
  return new Promise((resolve, reject) => {
    const dummyResponse = {
      ok: true,
      status: 200,
      data: testResponseData,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(dummyResponse);
  });
});

// vi.stubGlobal("fetch", () => {
//   return;
// });
vi.stubGlobal("fetch", testFetch);

describe("sendDataRequest()", () => {
  it("should return any available response data", () => {
    const testPayload = { header: "something" };
    return expect(sendDataRequest(testPayload)).resolves.toEqual(
      testResponseData
    );
  });
});
