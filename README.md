# Automated Testing with JavaScript

Here are my learnings from the Udemy Course - [JavaScript Unit Testing](https://www.udemy.com/course/javascript-unit-testing-the-practical-guide/) - to use for future reference when writing tests.

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
