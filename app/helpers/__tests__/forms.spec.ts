import rdf from '@ontologies/core';

import {
  isMarkedForRemove,
  retrieveIdFromValue,
} from '../forms';

describe('helpers', () => {
  describe('forms', () => {
    const node = rdf.namedNode('id');

    describe('retrieveIdFromValue', () => {
      it('retrieves id from JSONLDObject', () => {
        expect(retrieveIdFromValue({
          '@id': node,
          key1: 'value1',
        })).toEqual(node);
      });

      it('retrieves id from Node', () => {
        expect(retrieveIdFromValue(node)).toEqual(node);
      });

      it('returns undefined for Literals', () => {
        expect(retrieveIdFromValue(rdf.literal('JSDONLDObject'))).toBe(undefined);
      });

      it('returns undefined for undefined', () => {
        expect(retrieveIdFromValue(undefined)).toBe(undefined);
      });
    });

    describe('isMarkedForRemove', () => {
      it('returns true for falsy inputs', () => {
        expect(isMarkedForRemove(0)).toBe(true);
        expect(isMarkedForRemove(null)).toBe(true);
        expect(isMarkedForRemove(undefined)).toBe(true);
        expect(isMarkedForRemove(false)).toBe(true);
      });
    });
  });
});
