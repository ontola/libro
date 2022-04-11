import rdf from '@ontologies/core';
import { LinkReduxLRSType } from 'link-redux';

import ex from '../../ontology/ex';
import {
  allow,
  convertKeysAtoB,
  entityIsLoaded,
  filter,
  sort,
} from '../data';

const e = ex.ns('e');
const input = [ex.ns('a'), ex.ns('f'), ex.ns('e'), ex.ns('d'), ex.ns('a'), ex.ns('b')];
const ordered = [ex.ns('a'), ex.ns('a'), ex.ns('b'), ex.ns('d'), ex.ns('e'), ex.ns('f')];

describe('helpers', () => {
  describe('data', () => {
    describe('allow', () => {
      it('should filter by default', () => {
        expect(allow(input, [])).toHaveLength(0);
      });

      it('should let elements through by IRI', () => {
        expect(allow(input, [ex.ns('e')])).toEqual([e]);
      });

      it('should let elements through by regex', () => {
        expect(allow(input, [/e$/])).toEqual([e]);
      });
    });

    describe('filter', () => {
      it('should allow by default', () => {
        expect(filter(input, [])).toHaveLength(input.length);
      });

      it('should filter elements by IRI', () => {
        const result = filter(input, [e]);
        expect(result).toHaveLength(input.length - 1);
        expect(result).not.toContain([e]);
      });

      it('should filter elements by regex', () => {
        const result = filter(input, [/e$/]);
        expect(result).toHaveLength(input.length - 1);
        expect(result).not.toContain([e]);
      });
    });

    describe('sort', () => {
      it('should sort the elements', () => {
        expect(input.sort(sort([]))).toEqual(ordered);
      });

      it('should allow changing the order', () => {
        const expected = [
          ex.ns('d'),
          ex.ns('b'),
          ex.ns('a'),
          ex.ns('a'),
          ex.ns('e'),
          ex.ns('f'),
        ];
        expect(input.sort(sort(['d', 'b']))).toEqual(expected);
      });
    });

    describe('convertKeysAtoB', () => {
      it('converts keys', () => {
        const email = rdf.literal('staff@argu.co');
        const url = rdf.literal('https://argu.localdev/argu/nederland');
        const id = rdf.literal('id');

        const keysInput = {
          '@id': [id],
          'aHR0cDovL3NjaGVtYS5vcmcvZW1haWw=': [email],
          'aHR0cHM6Ly9ucy5vbnRvbGEuaW8vY29yZSNyZWRpcmVjdFVybA==': [url],
        };
        const keysOutput = {
          '@id': [id],
          'http://schema.org/email': [email],
          'https://ns.ontola.io/core#redirectUrl': [url],
        };
        expect(convertKeysAtoB(keysInput, {}, true)).toEqual(keysOutput);
      });
    });

    describe('entityIsLoaded', () => {
      it('returns false for undefined', () => {
        expect(entityIsLoaded(null as unknown as LinkReduxLRSType, undefined)).toBe(false);
      });
    });
  });
});
