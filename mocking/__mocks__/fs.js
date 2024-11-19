import { vi } from "vitest";

export const promises = {
  // we can mock the real writeFile function by returning a promises like it would in reality
  writeFile: vi.fn(() => {
    return new Promise((resolve, reject) => {
      // resolves with undefined like the real function
      resolve();
    });
  }),
};
