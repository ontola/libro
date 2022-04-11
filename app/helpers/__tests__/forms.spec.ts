import rdf from '@ontologies/core';

import {
  clearRemoval,
  destroyFieldName,
  isMarkedForRemove,
  retrieveIdFromValue,
} from '../forms';

describe('helpers', () => {
  describe('forms', () => {
    const node = rdf.namedNode('id');
    describe('clearRemoval', () => {
      const expected = {
        '@id': node,
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };

      it('removes destroy field name', () => {
        expect(clearRemoval({
          '@id': node,
          [destroyFieldName]: 'w/e',
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
        })).toEqual(expected);
      });

      it('does not change other keys', () => {
        expect(clearRemoval({
          '@id': node,
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
        })).toEqual(expected);
      });
    });

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
