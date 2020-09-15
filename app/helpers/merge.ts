/*
 * Helper for merge-anything
 */
export const concatStrings = (separator: string) => (value1: any, value2: any, _: string | symbol): any => (
  typeof value1 === 'string' && typeof value2 === 'string'
    ? `${value1}${separator}${value2}`
    : value2
);
