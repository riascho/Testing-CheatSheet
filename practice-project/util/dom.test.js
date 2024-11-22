import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import { Window } from "happy-dom";
import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();
const window = new Window(); // emulated browser window
const document = window.document;
vi.stubGlobal("document", document); // replaces the real DOM with our virtual DOM

beforeEach(() => {
  document.body.innerHTML = "";
  document.write(htmlDocContent); // loads our HTML file into virtual DOM
});

describe("showError()", () => {
  it("there should not be any error paragraphs in the id='errors' element initially", () => {
    const errorsElement = document.getElementById("errors");
    const errorsParagraph = errorsElement.firstElementChild;
    expect(errorsParagraph).toBeNull();
  });

  it("should add error paragraph to the id='errors' element", () => {
    const errorsElement = document.getElementById("errors");
    showError();
    const errorsParagraph = errorsElement.firstElementChild;
    expect(errorsParagraph).not.toBeNull();
  });

  it("should reset every error paragraphs", () => {
    const errorsElement = document.getElementById("errors");
    const errorsParagraph = errorsElement.firstElementChild;
    expect(errorsParagraph).toBeNull();
  });

  it("should output the correct error message from input", () => {
    const testMessage = "Some Error Message";
    const errorsElement = document.getElementById("errors");
    showError(testMessage);
    const errorsParagraph = errorsElement.firstElementChild;
    expect(errorsParagraph.textContent).toBe(testMessage);
  });
});
