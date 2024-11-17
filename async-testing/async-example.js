import jwt from "jsonwebtoken";

// using callbacks
export function generateToken(userEmail, doneFn) {
  jwt.sign({ email: userEmail }, "secret123", doneFn);
}

// using promises
export function generateTokenPromise(userEmail) {
  const promise = new Promise((resolve, reject) => {
    jwt.sign({ email: userEmail }, "secret123", (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
  return promise;
}

// using async await
export async function generateTokenAsyncAwait(userEmail) {
  const promise = await new Promise((resolve, reject) => {
    jwt.sign({ email: userEmail }, "secret123", (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
  return promise;
}

// how to call each
// generateToken("test@test.com", (err, token) => {
//   console.log(token);
// });
// generateTokenPromise("test@gmail.com").then((token) => console.log(token));
// generateTokenAsyncAwait("test@yahoo.com").then((token) => console.log(token));
