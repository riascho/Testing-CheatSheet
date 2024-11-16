export function extractNumbers(formData: FormData) {
  const num1Input = formData.get("num1") as string;
  const num2Input = formData.get("num2") as string;

  return [num1Input, num2Input];
}

export function getFormInput(form: HTMLFormElement) {
  const formData: FormData = new FormData(form);
  const input: string[] = extractNumbers(formData);
  return input;
}
