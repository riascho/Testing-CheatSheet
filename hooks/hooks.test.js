import {
  it,
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";

import { User } from "./hooks";

// global user object but different instantiations on suite level
let user;

describe.concurrent("class User with test email", () => {
  const testEmail = "test@test.com";
  // using hooks
  beforeAll(() => {
    user = new User(testEmail);
  });
  afterEach(() => {
    user = new User(testEmail);
  });
  it("should update the email", () => {
    const newTestEmail = "test2@test.com";
    user.updateEmail(newTestEmail);
    expect(user.email).toBe(newTestEmail);
  });

  it("should have an email property", () => {
    expect(user).toHaveProperty("email");
  });

  it("should store the provided email value", () => {
    expect(user.email).toBe(testEmail); // running this without hooks would fail because an earlier test had updated the email of the global test object!
  });
});

describe.concurrent("class User with prod email", () => {
  const prodEmail = "John@gmail.com";
  beforeAll(() => {
    user = new User(prodEmail);
  });
  it("should clear the email", () => {
    user.clearEmail();
    expect(user.email).toBe("");
  });

  it("should still have an email property after clearing the email", () => {
    user.clearEmail();
    expect(user).toHaveProperty("email");
  });
});
