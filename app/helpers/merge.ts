/*
 * Helper for merge-anything
 */
export const concatStrings = (separator: string) => (value1: unknown, value2: unknown, _: string | symbol): string | unknown => (
  typeof value1 === 'string' && typeof value2 === 'string'
    ? `${value1}${separator}${value2}`
    : value2
);
