export const PERCENTAGE = 100;

/**
 * Calculates rounded percentage when given a number and the total amount
 * @param {number} number The number to calculate the percentage of
 * @param {number} total The total amount
 * @return {number} result Returns a rounded percentage
 */
export const calcPercentage = (number, total) => {
  if (total === 0) {
    return undefined;
  }

  if (typeof number !== 'number' || typeof total !== 'number') {
    return undefined;
  }
  return Math.round((number / total) * PERCENTAGE);
};
