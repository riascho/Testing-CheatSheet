import { getFormInput } from "./src/parser.ts";
import { calculate } from "./src/math.ts";
import { generateOutput, renderOutput } from "./src/output.ts";

const formElement = document.querySelector<HTMLFormElement>("form")!;

function formSubmitHandler(event: Event) {
  event.preventDefault();
  const numberInputs: string[] = getFormInput(formElement);
  const calculationResult: string = calculate(numberInputs);
  const result = generateOutput(calculationResult);
  renderOutput(result);
}

formElement.addEventListener("submit", formSubmitHandler);
