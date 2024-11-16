import { validateStringNotEmpty, validateNumber } from "./validation.ts";

export function transformToNumber(value: string) {
  return +value;
}

export function sanitizeNumbers(numbers: string[]) {
  const cleanNumbers: number[] = [];
  for (const num of numbers) {
    validateStringNotEmpty(num);
    const cleanNumber: number = transformToNumber(num);
    validateNumber(cleanNumber);
    cleanNumbers.push(cleanNumber);
  }
  return cleanNumbers;
}
