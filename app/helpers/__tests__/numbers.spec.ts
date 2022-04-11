/* eslint @typescript-eslint/no-magic-numbers: 0 */

import rdf from '@ontologies/core';

import {
  calcPercentage,
  countInParentheses,
  tryParseFloat,
  tryParseInt,
} from '../numbers';

describe('helpers', () => {
  describe('numbers', () => {
    describe('calcPercentage', () => {
      it('transforms to percentage', () => {
        expect(calcPercentage(1, 8)).toEqual(13);
      });

      it('rejects zero divisions', () => {
        expect(calcPercentage(45, 0)).toBeUndefined();
      });

      it('rejects non-number parameters', () => {
        expect(calcPercentage('joe', 32)).toBeUndefined();
      });
    });

    describe('countInParentheses', () => {
      it ('formats integers', () => {
        expect(countInParentheses(1)).toBe('(1)');
        expect(countInParentheses(123456789)).toBe('(123456789)');
      });

      it('parses literals', () => {
        expect(countInParentheses(rdf.literal(2))).toBe('(2)');
        expect(countInParentheses(rdf.literal(987654321))).toBe('(987654321)');
        expect(countInParentheses(rdf.literal('00100'))).toBe('(100)');
      });

      it ('hides zero', () => {
        expect(countInParentheses(0)).toBe('');
        expect(countInParentheses(rdf.literal(0))).toBe('');
        expect(countInParentheses(rdf.literal('0'))).toBe('');
      });

      it ('does not throw on edge case numbers', () => {
        expect(typeof countInParentheses(-1)).toBe('string');
        expect(typeof countInParentheses(1.5)).toBe('string');
        expect(typeof countInParentheses(2/3)).toBe('string');
        expect(typeof countInParentheses(Infinity)).toBe('string');
        expect(typeof countInParentheses(NaN)).toBe('string');
      });
    });

    describe('tryParseFloat', () => {
      it('handles falsy values', () => {
        expect(tryParseFloat(0)).toBe(0);
        expect(tryParseFloat(NaN)).toBe(undefined);
        expect(tryParseFloat(undefined)).toBe(undefined);
        expect(tryParseFloat(false)).toBe(undefined);
        expect(tryParseFloat(null)).toBe(undefined);
        expect(tryParseFloat('')).toBe(undefined);
      });
    });

    describe('tryParseInt', () => {
      it('handles falsy values', () => {
        expect(tryParseInt(0)).toBe(0);
        expect(tryParseInt(NaN)).toBe(undefined);
        expect(tryParseInt(undefined)).toBe(undefined);
        expect(tryParseInt(false)).toBe(undefined);
        expect(tryParseInt(null)).toBe(undefined);
        expect(tryParseInt('')).toBe(undefined);
      });
    });
  });
});
