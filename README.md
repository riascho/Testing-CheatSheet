# Automated Testing with JavaScript

Here are my learnings from the Udemy Course - [JavaScript Unit Testing](https://www.udemy.com/course/javascript-unit-testing-the-practical-guide/) - to use for future reference when writing tests, especially with `vitest` and `jest`.

## Table of Contents

1. [Types of Testing](#types-of-testing)
2. [Testing Setup](#testing-setup)
3. [Examples](#examples)
4. [Testing Basics](#testing-basics)
5. [AAA Principle](#aaa-principle)
6. [Testing for Errors](#testing-for-errors)
7. [Testing for Opposites](#testing-for-opposites)
8. [Testing with Multiple Assertions](#testing-with-multiple-assertions)
9. [Test Suites](#test-suites)
10. [Writing Good Tests](#writing-good-tests)
11. [Test Coverage](#test-coverage)
12. [Integration Tests](#integration-tests-1)
13. [Advanced Testing Concepts](#advanced-testing-concepts)
14. [Resources](#resources)

## Types of Testing

### Unit Testing

Unit testing involves testing individual components or functions (or classes) of an application in isolation to ensure they work as expected. These tests are typically written by developers and focus on the smallest parts of the application.

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
- **Explanation:** In this step, you initialize any variables or class objects, set up dependencies, and define the inputs that the test will use. This preparation helps isolate the functionality being tested, ensuring that any external dependencies or state will not affect the outcome.
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

## Integration Tests

Integration tests are a type of testing that assess the interactions between different components or systems within an application to ensure they work together as expected.
Used for functions that call other functions (either builtin or custom functions or 3rd party packages). This implicitly tests the combination and interdependency of the unit and these functions.

### Use Cases

- **After Unit Testing:** Once individual components (units) have been tested, integration tests are employed to verify that these components integrate properly.

- **End-to-End Workflows:** They are used to test complete workflows that involve multiple parts of the system, ensuring that data flows as intended across modules.

- **Database Interactions:** Integration tests are crucial when checking how the application handles interactions with databases or external services.

- **API Testing:** They can also be useful when testing APIs to ensure that different services interact correctly when data is sent and received.

- **Identifying Broken Interfaces:** Integration tests help in detecting problems arising from mismatched interfaces between integrated components.

# Advanced Testing Concepts

## [Testing Asynchronous Code](./async-testing/)

`vitest`/`jest` by default do not run tests asynchronously. So the asynchronicity has to be built into the tests themselves.

### Callback Testing

This can be achieved by using the `done` callback to signal that the test is complete. Call `done()` when the async operation finishes. This will make the test runner wait and execute everything until this `done()` is called and therefore change what the assertion will yield as a result.

```javascript
it("should return a token value", (done) => {
  const testEmail = "test@test.com";
  generateToken(testEmail, (err, token) => {
    try {
      expect(token).toBeDefined(); // will pass
      expect(token).toBe("eyJhbGciOiJIUzI1"); // will fail
      done();
    } catch (err) {
      done(err);
    }
  });
});
```

> `done()` does not pick up any errors but only return values. Therefore if there are any errors it's safer to wrap them in a `try`/`catch` block and return the error to `done(err)`

### Promise Testing

In `vitest`/`jest` the keyword `expect()` supports promises out of the box. Instead of using any `.to()` function chains directly, it uses the keywords `.resolves` and `.rejects` in front of the `.to()` function in order to evaluate the actual resolution value that is returned from the promise. It is important to `return` this promise assertion, so that the test runner will wait for the promise to be resolved.

```javascript
it("should return a token value", () => {
  const testEmail = "test@test.com";
  return expect(generateTokenPromise(testEmail)).resolves.toBeDefined(); // will pass
  return expect(generateTokenPromise(testEmail)).resolves.toBe(
    "eyJhbGciOiJIUzI1"
  ); // will fail
});
```

### Async/Await Testing

When writing tests using the `async`/`await` keywords in `vitest`/`jest`, it's important to understand that `async` functions return a promise. This promise can then be assigned to a variable and can then be evaluated the same as in synchronous assertions.

```javascript
it("should return a token value", async () => {
  const testEmail = "test@test.com";
  const token = await generateTokenAsyncAwait(testEmail);
  expect(token).toBeDefined(); // will pass
  expect(token).toBe("eyJhbGciOiJIUzI1"); // will fail
});
```

> You don't need to return anything when using `async`/`await` (since a function annotated with `async` returns a promise implicitly).

## [Test Hooks](./hooks/)

Test Hooks are special functions provided by `vitest`/`jest`, that are executed automatically by the test runner at a certain point of time. They help in setting up preconditions, initializing resources, cleaning up after tests, and ensuring consistent test behavior. Hooks can be applied on the `describe()` (suite) level or globally.

The common test hooks in both `vitest` and `jest` are:

- `beforeEach` - Runs before each test in a test suite. Ideal for resetting or initializing conditions before every test, ensuring each test starts from a known state.
- `beforeAll` - Runs once before all the tests in a test suite. Useful for setting up a shared resource (e.g., database connection) that is used by all tests in the suite.
- `afterEach` - Runs after each test in a test suite. Commonly used to clean up or reset anything that may have been altered during the test, like clearing mocks or resetting data.
- `afterAll` - Runs once after all tests in a test suite. Great for tearing down global resources or connections that were established in beforeAll.

### When to Use Test Hooks

- **Data Initialization:** - When you need specific data or configurations before running tests.
- **Mocking:** - To mock certain resources or APIs before each test and clear them afterward.
- **Resource Cleanup:** - To ensure temporary data or connections don’t persist beyond the test suite.

## Concurrent Testing

By standard, tests are run in synchronous order after one another. Concurrent testing involves running multiple tests simultaneously to speed up the testing process and ensure that the application can handle multiple operations at the same time. This is particularly useful for large test suites or applications that need to handle high levels of concurrency in production.

### Implementation

In `vitest`/`jest`, concurrent testing can be achieved using the `it.concurrent`(or `test.concurrent`) method. This annotation allows tests to run in parallel, reducing the overall time required to execute the test suite.

```javascript
import { it, expect } from "vitest";

it.concurrent("test 1", async () => {
  const result = await someAsyncFunction();
  expect(result).toBeDefined();
});

it.concurrent("test 2", async () => {
  const result = await anotherAsyncFunction();
  expect(result).toBeDefined();
});
```

In addition to running individual tests concurrently, you can also run entire test suites concurrently using the `describe.concurrent` annotation. This allows multiple test suites to execute in parallel, further speeding up the testing process.

```javascript
import { describe, it, expect } from "vitest";

describe.concurrent("Suite 1", () => {
  it("test 1", async () => {
    const result = await someAsyncFunction();
    expect(result).toBeDefined();
  });

  it("test 2", async () => {
    const result = await anotherAsyncFunction();
    expect(result).toBeDefined();
  });
});

describe.concurrent("Suite 2", () => {
  it("test 3", async () => {
    const result = await yetAnotherAsyncFunction();
    expect(result).toBeDefined();
  });

  it("test 4", async () => {
    const result = await differentAsyncFunction();
    expect(result).toBeDefined();
  });
});
```

Even when not adding the `.concurrent` annotation, tests that are stored in different files are executed in parallel. This is done by both `vitest` and `jest` - ensuring that tests are run in a short amount of time.

> A downside of concurrent execution is, that tests that perform clashing (global) state manipulations may interfere with each other.

## [Mocking & Spies](./mocking/)

### Side Effects of Testing:

- **External Dependencies**: Tests that interact with external systems (e.g., databases, APIs) can cause unintended changes or incur costs.

- **State Changes**: Tests can alter the state of the system or environment, leading to potential interference with other tests.

- **Resource Consumption**: Tests may consume resources such as memory, CPU, or network bandwidth, which can affect the performance of the system.

### [Spies](./mocking/src/data.test.js)

Spies are a type of test double that records how it is used, such as which methods were called and with what arguments. Spies are “wrappers” around functions or empty replacements for functions that allow you to track if & how a function was called. This is for when wanting to test if the functions are called and not so much about what the function actually does.
Spies are useful for verifying interactions between objects without affecting the actual behavior of the system.

This is an example of testing a function and whether it calls the function provided in its arguments. It uses the `vi` object to set up a spy function (`.fn()`) that is used to track any execution calls and arguments provided to it.

```javascript
// production code to be tested
function generateReportData(logFn) {
  const data = "Some dummy data for this demo app";
  if (logFn) {
    logFn(data);
  }
  // test will fail if the logFn function wasn't called here
  return data;
}

// test
it("should call function if one was provided in argument", () => {
  const logger = vi.fn();
  generateReportData(logger);
  expect(logger).toBeCalled();
});
```

### [Mocking](./mocking/src/util/io.test.js)

Mocking is the practice of creating objects that simulate the behavior of real objects. Mocks are used to isolate the unit of work being tested and to ensure that tests are not dependent on external systems or states. Mocks act as a replacement for an API that may provide some test-specific behavior instead, i.e. changes the behavior of the function to test but in a way that it aids the test of the unit to be tested in general.

In `vitest` the `vi` object (or the `jest` object in `jest`) can be used to set up a mock function (`.mock()`) that will call any built-in or 3rd party functions but will. It takes one string argument, that is the name of the module to be mocked. What `vitest` does under the hood is to find this 3rd party module and replaces all functions it has with empty spy functions. For all further tests, the 3rd party API can now be used as it would in production but without the tests interfering with the actual production environment.

```javascript
// production code to be tested
function writeData(data, filename) {
  const storagePath = path.join(process.cwd(), "data", filename);
  return fs.writeFile(storagePath, data);
}

// test
import { it, expect, vi } from "vitest";
import writeData from "./io";
import { promises as fs } from "fs";

vi.mock("fs"); // mocks the "fs" module with empty spy functions

it("should execute the writeFile() function", () => {
  const testData = "This is test data";
  const testFileName = "test.txt";
  writeData(testData, testFileName); // Act: call production function normally
  expect(fs.writeFile).toBeCalled(); // Assertion: check if the mocked "fs" function was called by the prod function in test
});
```

> In `jest` the `jest.mock()` has to be called at the top of the file before the mocked module is imported. This is not necessary in `vitest` as the `vi.mock()` function is hoisted.
> Mocking is only done per test file. Has to be repeated in each test file, where modules or APIs need to be mocked.

### Custom Mocking Logic

The `vi.fn()` function can be used with some custom function implementation as a callback to mock specific function behavior.

**Example:** This can be useful when testing for the right arguments this function is supposed to be calling.

```javascript
const mockFunction = vi.fn((a, b) => a + b);
const result = mockFunction(2, 3);
expect(mockFunction).toBeCalledWith(2, 3);
expect(result).toBe(5);
```

When using `vi.mock()` the function to be mocked can be replaced with custom properties as well.

**Example:** Mocking the `join()` method of the `path` module. Have to wrap it in a `default` object because that's how it's imported. Make it so it simply returns the last argument provided (no matter how many arguments in total are given), because this is what is important for our test.

```javascript
vi.mock("path", () => {
  return {
    default: {
      join(...args) {
        return args[args.length - 1];
      },
    },
  };
});
```

### [Mocking Globally](./mocking/__mocks__/)

In `vitest`/`jest` the folder `__mocks__` can be used to set up mocks for all tests globally. This folder then contains files of all the modules that you want to mock. In there you can set up the module with the properties that you need specifically for the testing. Use a spy function for that to keep track of executions.
When using the `mock()` function, the test runner will automatically search for this folder `__mocks__` to find the modules to be mocked. If not found, the module will be replaced with empty properties.

### mockImplementation and mockImplementationOnce

In `jest`/`vitest`, the `mockImplementation` and `mockImplementationOnce` functions are used to overwrite existing mock functions with custom implementations when needed in specific scenarios. This is helps to keep a global mock function but have different implementations of certain components across different tests.

The `mockImplementation()` function allows you to specify a default implementation for a mock function. This implementation will be used every time the mock function is called.

The `mockImplementationOnce()` function allows you to specify an implementation that will be used only once. After the first call, the mock function will revert to its original implementation or the default mock behavior.

> These functions are called on the mock function itself.

**Example:** The `fetchData` function is mocked to return a resolved promise on the first call and a rejected promise on the second call.

```javascript
import { it, expect, vi } from "vitest";
import { fetchData } from "./api";

vi.mock("./api");

it("should return data on first call and error on second call", async () => {
  const mockFetchData = vi.fn();
  mockFetchData.mockImplementationOnce(() =>
    Promise.resolve({ data: "first call" })
  );
  mockFetchData.mockImplementationOnce(() =>
    Promise.reject(new Error("second call error"))
  );

  const firstCall = await mockFetchData();
  expect(firstCall.data).toBe("first call");

  await expect(mockFetchData()).rejects.toThrow("second call error");
});
```

# Resources

- https://www.udemy.com/course/javascript-unit-testing-the-practical-guide/

- https://vitest.dev/api/expect.html
- https://vitest.dev/guide/features.html#coverage
- https://vitest.dev/guide/features.html#running-tests-concurrently

- https://vitest.dev/api/vi.html
- https://jestjs.io/docs/jest-object
