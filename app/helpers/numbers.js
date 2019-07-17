export const PERCENTAGE = 100;

const SIZES = ['Byte', 'KB', 'MB', 'GB', 'TB'];
const ZERO_BYTE = '0 Byte';
const BYTE_SIZE_TO_KBYTE = 1024;

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

export function countInParentheses(count) {
  if (!count) return '';
  const val = typeof count === 'number' ? count : Number.parseInt(count.value, 10);

  return val > 0 ? `(${val})` : '';
}

export function byteToSize(byte) {
  if (byte === 0) return ZERO_BYTE;
  const i = parseInt(Math.floor(Math.log(byte) / Math.log(BYTE_SIZE_TO_KBYTE)), 8);

  return `${Math.round(byte / (BYTE_SIZE_TO_KBYTE ** i))} ${SIZES[i]}`;
}

export function tryParseFloat(linkedProp) {
  if (!linkedProp || Number.isNaN(linkedProp.value)) {
    return undefined;
  }

  return Number.parseFloat(linkedProp.value);
}

export function tryParseInt(linkedProp) {
  if (!linkedProp || Number.isNaN((linkedProp.value || linkedProp))) {
    return undefined;
  }

  return Number.parseInt((linkedProp.value || linkedProp), 10);
}
