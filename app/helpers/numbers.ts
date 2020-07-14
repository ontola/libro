import { isTerm, Literal, SomeTerm } from '@ontologies/core';

export const PERCENTAGE = 100;

const SIZES = ['Byte', 'KB', 'MB', 'GB', 'TB'];
const ZERO_BYTE = '0 Byte';
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

export function byteToSize(byte: number): string {
  if (byte === 0) {
    return ZERO_BYTE;
  }
  const i = parseInt(Math.floor(Math.log(byte) / Math.log(BYTE_SIZE_TO_KBYTE)).toString(), 8);

  return `${Math.round(byte / (BYTE_SIZE_TO_KBYTE ** i))} ${SIZES[i]}`;
}

export function tryParseFloat(linkedProp: undefined | null | SomeTerm) {
  if (!linkedProp || Number.isNaN(Number(linkedProp.value))) {
    return undefined;
  }

  return Number.parseFloat(linkedProp.value);
}

export function tryParseInt(linkedProp: undefined | null | SomeTerm | number | string) {
  const value = isTerm(linkedProp) ? linkedProp.value : linkedProp;
  if (!linkedProp || Number.isNaN(Number(value))) {
    return undefined;
  }

  return Number.parseInt(value!.toString(), 10);
}
