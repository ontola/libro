/**
 * Calls the callback with the given value if it isn't undefined.
 */
export const use = <T>(v: T | undefined, cb: (it: T) => void): void => {
  if (v !== undefined) {
    cb(v);
  }
};
