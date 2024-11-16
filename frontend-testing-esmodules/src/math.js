import { sanitizeNumbers } from "./util/numbers.js";

export function add(numberInputs) {
  let sum = 0;
  for (const item of numberInputs) {
    sum += Number(item);
  }
  return sum;
}

export function calculate(numberInputs) {
  let result = "";
  try {
    const cleanNumbers = sanitizeNumbers(numberInputs);
    result = add(cleanNumbers).toString();
  } catch (error) {
    result = error.message;
  }
  return result;
}
