import { sanitizeNumbers } from "./util/numbers.ts";

export function add(numberInputs: number[]) {
  let sum: number = 0;
  for (const item of numberInputs) {
    sum += Number(item);
  }
  return sum;
}

export function calculate(numberInputs: string[]) {
  let result: string = "";
  try {
    const cleanNumbers: number[] = sanitizeNumbers(numberInputs);
    result = add(cleanNumbers).toString();
  } catch (error) {
    result = error.message;
  }
  return result;
}
