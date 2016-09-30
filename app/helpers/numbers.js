const PERCENTAGE = 100;

export const calcPercentage = (number, total) => {
  if (total < 1) {
    return undefined;
  }

  if (typeof number !== 'number' || typeof total !== 'number') {
    return undefined;
  }
  return Math.round((number / total) * PERCENTAGE);
};
