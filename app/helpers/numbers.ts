import { Literal, isTerm } from '@ontologies/core';

export const PERCENTAGE = 100;

const SIZES = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'];
const BYTE_SIZE_TO_KBYTE = 1024;

/**
 * Calculates rounded percentage when given a number and the total amount
 * @param {number} value The number to calculate the percentage of
 * @param {number} total The total amount
 * @return {number} result Returns a rounded percentage
 */
export const calcPercentage = (value: unknown, total: unknown): number | undefined => {
  if (total === 0) {
    return undefined;
  }

  if (typeof value !== 'number' || typeof total !== 'number') {
    return undefined;
  }

  return Math.round((value / total) * PERCENTAGE);
};

export function countInParentheses(count: number | Literal): string {
  if (!count) {
    return '';
  }

  const val = typeof count === 'number' ? count : Number.parseInt(count.value, 10);

  return val > 0 ? `(${val})` : '';
}

export function byteToSize(byte: number): [number, string] {
  if (byte === 0) {
    return [0, 'byte'];
  }

  const i = parseInt(Math.floor(Math.log(byte) / Math.log(BYTE_SIZE_TO_KBYTE)).toString(), 8);

  return [Math.round(byte / (BYTE_SIZE_TO_KBYTE ** i)), SIZES[i]];
}

export function tryParseFloat(linkedProp: unknown): number | undefined {
  const value = isTerm(linkedProp) ? linkedProp.value : linkedProp;

  const resultOrNaN = Number.parseFloat(`${value}`);

  return Number.isNaN(resultOrNaN) ? undefined : resultOrNaN;
}

export function tryParseInt(linkedProp: unknown): number | undefined {
  const value = isTerm(linkedProp) ? linkedProp.value : linkedProp;

  const resultOrNaN = Number.parseInt(`${value}`, 10);

  return Number.isNaN(resultOrNaN) ? undefined : resultOrNaN;
}

export type MappedRange = (num: number) => number;

export const mapRange = (in_min: number, in_max: number, out_min: number, out_max: number): MappedRange =>
  (num: number) => (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
