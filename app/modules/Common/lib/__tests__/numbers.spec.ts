/* eslint @typescript-eslint/no-magic-numbers: 0 */

import rdf from '@ontologies/core';

import {
  byteToSize,
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

    describe('byteToSize', () => {
      it('handles numbers of all sizes', () => {
        expect(byteToSize(0)).toEqual([0, 'byte']);
        expect(byteToSize(1)).toEqual([1, 'byte']);
        expect(byteToSize(10)).toEqual([10, 'byte']);
        expect(byteToSize(10000)).toEqual([10, 'kilobyte']);
        expect(byteToSize(10000000)).toEqual([10, 'megabyte']);
        expect(byteToSize(10000000000)).toEqual([9, 'gigabyte']);
        expect(byteToSize(10000000000000)).toEqual([9, 'terabyte']);
        expect(byteToSize(Infinity)).toEqual([NaN, undefined]);
        expect(byteToSize(-Infinity)).toEqual([NaN, undefined]);
        expect(byteToSize(NaN)).toEqual([NaN, undefined]);
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

      it('parses numbers', () => {
        expect(tryParseFloat(1)).toBe(1);
        expect(tryParseFloat(1/2)).toBe(0.5);
        expect(tryParseFloat(-5)).toBe(-5);
        expect(tryParseFloat(1-1/3)).toBeCloseTo(2/3);
      });

      it('parses strings', () => {
        expect(tryParseFloat('3')).toBe(3);
        expect(tryParseFloat('-0.2')).toBe(-0.2);
        expect(tryParseFloat('010')).toBe(10);
      });

      it('parses terms', () => {
        expect(tryParseFloat(rdf.literal(7))).toBe(7);
        expect(tryParseFloat(rdf.namedNode('23'))).toBe(23);
      });

      it('handles bad input', () => {
        expect(tryParseFloat('123hoi')).toBe(undefined);
        expect(tryParseFloat('hoi123')).toBe(undefined);
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

      it('parses numbers', () => {
        expect(tryParseInt(1)).toBe(1);
        expect(tryParseInt(105)).toBe(105);
        expect(tryParseInt(-27)).toBe(-27);
        expect(tryParseInt(1.6)).toBe(1);
      });

      it('parses strings', () => {
        expect(tryParseInt('30')).toBe(30);
        expect(tryParseInt('070')).toBe(70);
      });

      it('parses terms', () => {
        expect(tryParseInt(rdf.literal(21))).toBe(21);
        expect(tryParseInt(rdf.namedNode('18'))).toBe(18);
      });

      it('handles bad input', () => {
        expect(tryParseInt('123hoi')).toBe(undefined);
        expect(tryParseInt('hoi123')).toBe(undefined);
      });
    });
  });
});
