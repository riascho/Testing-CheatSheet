import { describe, it, expect, beforeEach } from "vitest";
import { extractPostData } from "./posts";

const testTitle = "testing";
const testContent = "Testing this function";
let testForm = {};

describe("extractPostData()", () => {
  beforeEach(() => {
    testForm = {
      title: testTitle,
      content: testContent,
      get(property) {
        return this[property];
      },
    };
  });

  it("should extract title and content from provided form", () => {
    const data = extractPostData(testForm);
    expect(data.title).toEqual(testTitle);
    expect(data.content).toEqual(testContent);
  });
});
