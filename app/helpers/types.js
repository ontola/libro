export const isPromise = obj => (
  typeof obj?.then === 'function'
);
