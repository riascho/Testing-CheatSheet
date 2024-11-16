import { validateStringNotEmpty, validateNumber } from "./validation.js";

export function transformToNumber(value) {
  return +value;
}

export function sanitizeNumbers(numbers) {
  const cleanNumbers = [];
  for (const num of numbers) {
    validateStringNotEmpty(num);
    const cleanNumber = transformToNumber(num);
    validateNumber(cleanNumber);
    cleanNumbers.push(cleanNumber);
  }
  return cleanNumbers;
}
