import { getFormInput } from "./src/parser.js";
import { calculate } from "./src/math.js";
import { generateOutput, renderOutput } from "./src/output.js";

const formElement = document.querySelector("form");

function formSubmitHandler(event) {
  event.preventDefault();
  const numberInputs = getFormInput(formElement);
  const calculationResult = calculate(numberInputs);
  const result = generateOutput(calculationResult);
  renderOutput(result);
}

formElement.addEventListener("submit", formSubmitHandler);
