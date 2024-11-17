import { it, expect, describe } from "vitest";
import {
  generateToken,
  generateTokenAsyncAwait,
  generateTokenPromise,
} from "./async-example";

describe("callback function -> generateToken() with done()", () => {
  it("should return a token value", (done) => {
    const testEmail = "test@test.com";
    generateToken(testEmail, (err, token) => {
      try {
        expect(token).toBe(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE3MzE4MjE5OTJ9.3i9kiRewum3YLiqG46Y_2apDozo8jJNrL5yIkESZ7r8"
        ); // will fail
        expect(token).toBeDefined(); // will pass
        done(); // when calling done() -> test runner will wait until here
      } catch (err) {
        done(err); // done expects return value. Need to provide if error is thrown
      }
    });
  });
});

describe("promise function -> generateTokenPromise() with expect()", () => {
  const testEmail = "test@test.com";
  it("should return a token value", () => {
    return expect(generateTokenPromise(testEmail)).resolves.toBeDefined(); // will pass
    return expect(generateTokenPromise(testEmail)).resolves.toBe(
      "eyJhbGciOiJIUzo8jJNrL5yIkESZ7r8"
    ); // will fail
  });

  // it("should give error message when rejected", () => {
  //   expect(generateTokenPromise()).rejects.toContain("error message");
  // });
});

describe("async function -> with async ()", () => {
  it("should return a token value", async () => {
    const testEmail = "test@test.com";
    const token = await generateTokenAsyncAwait(testEmail);
    expect(token).toBeDefined(); // will pass
    expect(token).toBe("eyJhbGciOiJIUzo8jJNrL5yIkESZ7r8"); // will fail
  });
});
