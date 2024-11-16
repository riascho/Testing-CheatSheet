# Automated Testing with JavaScript

Here are my learnings from the Udemy Course - [JavaScript Unit Testing](https://www.udemy.com/course/javascript-unit-testing-the-practical-guide/) - to use for future reference when writing tests, especially with `vitest` and `jest`.

## Types of Testing

### Unit Testing

Unit testing involves testing individual components or functions of an application in isolation to ensure they work as expected. These tests are typically written by developers and focus on the smallest parts of the application.

### [Integration Testing](#integration-tests)

Integration testing checks how different modules or services in an application work together. It ensures that the interactions between integrated units function correctly and that data flows between them as expected.

### End-to-End (E2E) Testing

End-to-end testing simulates real user scenarios to validate the entire application flow from start to finish. It tests the complete application, including its interactions with external systems, to ensure that everything works together as intended.

## Testing Setup

- **Test Runner** to automatically detect testing code and executes it in development environment and then displays the results, e.g. `Jest`, `Karma` or `Vitest`
- **Assertion Library** to define expected testing outcomes and to check whether these are met (in sync and async modes), e.g. `Jest`, `Chai` or `Vitest`

_Note:_ `Jest` works better with `CommonJS` vs. `ES Modules`. It only supports ECMA Scripts as experimental. Therefore using `Vitest` (that also uses `Jest` syntax) is recommended.

**1. Install Vitest**

```bash
npm install --save-dev vitest
```

**2. Update Test Script in `package.json`**

```json
"scripts": {
    "test": "vitest --global" }
```

or

```json
  "scripts": {
    "test": "vitest --run --reporter verbose" }
```

**3. Install dependencies for each directory**

```bash
cd directory-name
npm install
```

## Examples

### [frontend-testing-esmodules](./frontend-testing-esmodules/)

Uses plain JS with **ES modules** with `import` / `export` syntax
and with `type="modules"` in HTML script tag

### [backend-testing-nodejs-commonjs](./backend-testing-nodejs-commonjs/)

Uses `node.js` with **common** JS with `require` / `module.exports` syntax

### [backend-testing-nodejs-esmodules](./backend-testing-nodejs-esmodules/)

Uses `node.js` with **ES modules** with `import` / `export` syntax and with `  "type": "module"` in `package.json`

## Testing Basics

- **Identifying Units** - Search for functions or pieces of code that are isolated and do not call other functions. These will often be exported as well.

- **Create Test File** - for that particular unit you want to test. This is the default process for `jest`. Name the file same as the original but with the infix `.test` or `.spec`, e.g. unit contained in file `math.js` -> will get `math.test.js` test file.

- **Insource Testing** - as alternative to having a separate file. The tests could also be written in the same file as the unit. This is a `vitest` feature.

- **Import** - the `test` (or `it`) and `expect` function from `vitest` or `jest`. When using `--global` flag with the `vitest` command, these global functions do not need to be imported every time but are available globally. However, the import will provide auto-completion when writing code.
  Also import the unit function that we want to test.

- **Calling** the `it` or `test` function. **First parameter** is a string that defines what is being tested and what the expectations are in a short and concise manner. **Second parameter** is a callback function that executes the unit function. It also calls the `expect` function with the result from the unit function execution. This is chained with a method that describes what the expected outcome should be (success criteria).
  > **expect()** does not return true or false. Instead, it throws an error, if the exception is not met. The test runner treats thrown errors as failed tests and tests that do not throw as passed.

```javascript
it("should summarize all numbers in a given array", () => {
  const result = add([1, 2, 3, 4, 5]);
  expect(result).toBe(15);
});
```

- **Run your tests** - given the correct `package.json` [configuration](#testing-setup), you should be able to just run `npm test` in the CLI (in the directory of the `package.json`) to run the tests. Can also be run in watch mode with `npm run test:watch` (press `q` to quit).

## AAA Principle

The **AAA (Arrange, Act, Assert)** principle is a widely used pattern in unit testing that helps organize tests in a clear and structured way. By separating each step of the test, it becomes easier to understand what the test is doing and why. The principle consists of three main steps:

### 1. Arrange

- **Definition:** The setup phase where you prepare all necessary conditions and inputs for the test.
- **Explanation:** In this step, you initialize any objects, set up dependencies, and define the inputs that the test will use. This preparation helps isolate the functionality being tested, ensuring that any external dependencies or state will not affect the outcome.
- **Example:** Creating a new instance of a class or setting specific variable values.

### 2. Act

- **Definition:** The execution phase where the functionality or method under test is invoked.
- **Explanation:** This is the step where you call the method or function you are testing with the arranged inputs. The goal here is to focus only on the action being tested, separating it from setup and validation to make the test more readable.
- **Example:** Calling a method like `calculateTotal()` on the arranged instance.

### 3. Assert

- **Definition:** The verification phase where you check the results of the action against expected outcomes.
- **Explanation:** In this final step, you validate that the result of the action matches the expected result. It determines which results lead to the test having succeeded or failed. This is where assertions are made to verify that the functionality works as intended, providing feedback if the outcome is incorrect.
- **Example:** Using assertions such as `expect().toBe()` to confirm that the test passes.

### Example

```javascript
it("should summarize all numbers in a given array", () => {
  // Arrange
  const numbers = [1, 2, 3, 4, 5];
  const expectedResult = numbers.reduce((prev, curr) => {
    return prev + curr;
  });
  // Act
  const result = add(numbers);
  // Assert
  expect(result).toBe(expectedResult);
});
```

## Testing for Errors

Basic unit tests only check return values. However, errors are not return values and therefore need to be tested for differently. This could be done using a `try`/`catch` block or wrapping the function to be tested in another function that can then be called by `vitest` or `jest`.

```javascript
it("should throw error if no input provided", () => {
  const resultFunction = () => add();
  expect(resultFunction).toThrowError();
});
```

or

```javascript
it("should throw error if no input provided", () => {
  try {
    add();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
  }
});
```

### Testing for specific Errors

The `expect` assertion can check the error message for a specific string, class instance of an error type or even a regex expression.

```typescript
toThrowError(expected?: string | Constructable | RegExp | Error): void
```

For example, if we want to check that an error is thrown that contains a specific wording:

```javascript
expect(resultFunction).toThrowError(/is not iterable/);
```

## Testing for Opposites

Using the `not` keyword will negate an assertion. For example, this code asserts that an input value is not equal to 2. If it's equal, the assertion will throw an error, and the test will fail.

```javascript
it("should not return 2 when calculating the square root of 16", () => {
  const input = Math.sqrt(16);
  expect(input).not.toBe(2);
});

it("should not throw error if no input provided", () => {
  const resultFunction = () => add();
  expect(resultFunction).not.toThrowError();
});
```

## Testing with Multiple Assertions

When it makes sense to group multiple assertions that have the same expectation they can be included in the same test.

```javascript
it("should throw 'Invalid number input' error if input is NaN or invalid number", () => {
  const invalidString = "two";
  const NaNInput = NaN;
  const isInvalidString = () => validateNumber(invalidString);
  const isAlreadyNaN = () => validateNumber(NaNInput);
  const assertions = [isInvalidString, isAlreadyNaN];
  assertions.forEach((assertion) => {
    expect(assertion).toThrowError(/Invalid number input/);
  });
});
```

## Test Suites

Test Suites help to organize tests in a way that the tested units and their assertions can be more easily identified. For this purpose the keyword `describe` can be used (the `describe` function has to be imported). It's a function with the **1st parameter** of a string describing the unit it is testing. Usually it is just the name of the function. The **2nd parameter** is a callback function that calls all `it()` assertions.

```javascript
import { it, expect, describe } from "vitest";
import { transformToNumber } from "./numbers";

describe("transformToNumber()", () => {
  it("should return numeric number from given numeric string input", () => {
    // test logic //
  });

  it("should return NaN if no input arguments provided", () => {
    // test logic //
  });

  it("should return NaN if invalid input provided", () => {
    // test logic //
  });

  it("should return 0 if input is not string", () => {
    // test logic //
  });
});
```

will log this:

```bash
 √ src/util/numbers.test.js (4)
   √ transformToNumber() (4)
     √ should return numeric number from given numeric string input
     √ should return NaN if no input arguments provided
     √ should return NaN if invalid input provided
     √ should return 0 if input is not string
```

`describe()` can be nested even further for a more granular approach (further level of indentation)

```javascript
describe("transformToNumber()", () => {
  describe("happyPath", () => {
    it("should return numeric number from given numeric string input", () => {
      // test logic //
    });
  });
});
```

## Writing Good Tests

- **Don't test what you can't change** - Tests are only required for your own code, no need to test 3rd party code like libraries, builtin browser APIs, native nodejs packages, etc.

- **Separate Frontend from Backend Tests** - Testing core functionalities of backend and frontend separately but do test the client-side reaction to different responses and errors (e.g. expected response data, missing response data, potential errors received from the response)

- **Single Responsibility** - Each test should only test one thing or one behaviour / expected result. Because you want to be able to isolate the responsible assertion in case of test failure. For example, when testing a feature, one test could be on validating input and another on transforming the input. But then even validating the input could be broken down further, for example validating an empty input or a specific amount of input characters etc.

- **Focus on the essence of what you're testing** - Keep tests simple and focused on the tested behaviour and avoid excessive test setups.

- **Keep number of assertions low** - Fewer assertions make the test easier to read and maintain as well as it helps in isolation the cause of a test failure.

- **Write code that's testable** - Sometimes that means to split out complex functions into smaller functions that get called. This helps to isolate behaviours and pin-point which functions cause test failures.

## Test Coverage

Vitest supports native code coverage via `v8` and instrumented code coverage via `istanbul`.

- Modify `package.json` to include coverage command:

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

- This will install `v8`

```json
  "devDependencies": {
    "c8": "^10.1.2" }
```

- Run `npm run coverage` to get vitest test coverage result

```bash
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |   66.66 |      100 |    62.5 |   66.66 |
 src            |    64.7 |      100 |      50 |    64.7 |
  math.js       |      55 |      100 |      50 |      55 | 12-20
  output.js     |   78.57 |      100 |      50 |   78.57 | 12-14
 src/util       |   68.96 |      100 |      75 |   68.96 |
  numbers.js    |   43.75 |      100 |      50 |   43.75 | 8-16
  validation.js |     100 |      100 |     100 |     100 |
----------------|---------|----------|---------|---------|-------------------
```

# Integration Tests

Integration tests are a type of testing that assess the interactions between different components or systems within an application to ensure they work together as expected.
Used for functions that call other functions (either builtin or custom functions or 3rd party packages). This implicitly tests the combination and interdependency of the unit and these functions.

## Use Cases

- **After Unit Testing:** Once individual components (units) have been tested, integration tests are employed to verify that these components integrate properly.

- **End-to-End Workflows:** They are used to test complete workflows that involve multiple parts of the system, ensuring that data flows as intended across modules.

- **Database Interactions:** Integration tests are crucial when checking how the application handles interactions with databases or external services.

- **API Testing:** They can also be useful when testing APIs to ensure that different services interact correctly when data is sent and received.

- **Identifying Broken Interfaces:** Integration tests help in detecting problems arising from mismatched interfaces between integrated components.

# Resources

- https://vitest.dev/api/expect.html
- https://vitest.dev/guide/features.html#coverage
