import { it, describe, expect, vi } from "vitest";
import { sendDataRequest } from "./http";
import { HttpError } from "./errors";

// mocking our own fetch method for testing
const testResponseData = { responseKey: "Value" };
const rejectMessage = "not valid json!";
const testFetch = vi.fn((url, payload) => {
  return new Promise((resolve, reject) => {
    if (typeof payload.body !== "string") {
      return reject(rejectMessage);
    }
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
  const testPayload = { requestKey: "value" };
  it("should return any available response data", () => {
    return expect(sendDataRequest(testPayload)).resolves.toEqual(
      testResponseData
    );
  });

  it("should parse data to JSON before sending it in request", async () => {
    let errorMessage;
    const expectedResult = JSON.stringify(testPayload);
    try {
      const result = await sendDataRequest(testPayload);
      expect(result).toBe(expectedResult);
    } catch (error) {
      errorMessage = error.message;
    }
    expect(errorMessage).not.toBe(rejectMessage);
  });

  it("should throw a HttpError if response status code is not ok", () => {
    testFetch.mockImplementationOnce((url, payload) => {
      return new Promise((resolve, reject) => {
        if (typeof payload.body !== "string") {
          return reject(rejectMessage);
        }
        const dummyResponse = {
          ok: false,
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
    return expect(sendDataRequest(testPayload)).rejects.toBeInstanceOf(
      HttpError
    );
  });
});
