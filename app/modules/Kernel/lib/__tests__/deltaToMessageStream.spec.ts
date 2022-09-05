import rdf, { Quadruple } from '@ontologies/core';
import { supplant } from '@ontologies/ld';

import ld from '../../ontology/ld';
import ontola from '../../ontology/ontola';
import sp from '../../ontology/sp';
import { deltaToMessageStream } from '../deltaToMessageStream';

describe('deltaToMessageStream', () => {
  const a0 = rdf.namedNode('a0');
  const a1 = rdf.namedNode('a1');
  const b0 = rdf.namedNode('b0');
  const b1 = rdf.namedNode('b1');
  const c0 = rdf.namedNode('c0');
  const c1 = rdf.namedNode('c1');

  it('converts an empty delta', () => {
    expect(deltaToMessageStream([])).toEqual([]);
  });

  it('raises on unknown operations', () => {
    expect(() => {
      deltaToMessageStream([a0, b0, c0, ld.purge]);
    }).toThrow();
  });

  describe('ontola deltas', () => {
    describe('ontola:replace', () => {
      it('converts given given given', () => {
        const delta: Quadruple[] = [
          [a0, b0, c0, ontola.replace],
        ];

        expect(deltaToMessageStream(delta)).toEqual([
          {
            field: b0.value,
            id: a0.value,
            type: 'SetField',
            value: c0,
          },
        ]);
      });
    });

    describe('ontola:remove', () => {
      it('converts given given given', () => {
        const delta: Quadruple[] = [
          [a0, b0, c0, ontola.remove],
        ];

        expect(deltaToMessageStream(delta)).toEqual([
          {
            field: b0.value,
            id: a0.value,
            type: 'DeleteFieldMatching',
            value: c0,
          },
        ]);
      });

      it('converts wild given given', () => {
        const delta: Quadruple[] = [
          [sp.Variable, b0, c0, ontola.remove],
        ];

        expect(deltaToMessageStream(delta)).toEqual([
          {
            field: b0.value,
            type: 'DeleteAllFieldsMatching',
            value: c0,
          },
        ]);
      });

      it('converts given given wild', () => {
        const delta: Quadruple[] = [
          [a0, b0, sp.Variable, ontola.remove],
        ];

        expect(deltaToMessageStream(delta)).toEqual([
          {
            field: b0.value,
            id: a0.value,
            type: 'DeleteField',
          },
        ]);
      });
    });

    describe('ontola:invalidate', () => {
      it('converts wild given given', () => {
        const delta: Quadruple[] = [
          [sp.Variable, b0, c0, ontola.invalidate],
        ];

        expect(deltaToMessageStream(delta)).toEqual([
          {
            field: b0.value,
            type: 'InvalidateAllWithProperty',
            value: c0,
          },
        ]);
      });

      it('converts given wild wild', () => {
        const delta: Quadruple[] = [
          [a0, sp.Variable, sp.Variable, ontola.invalidate],
        ];

        expect(deltaToMessageStream(delta)).toEqual([
          {
            id: a0.value,
            type: 'InvalidateRecord',
          },
        ]);
      });
    });
  });

  describe('linked-delta deltas', () => {
    it('converts singular ld:supplant', () => {
      const delta: Quadruple[] = [
        [a0, b0, c0, supplant],
      ];

      expect(deltaToMessageStream(delta)).toEqual([
        {
          fields: {
            [b0.value]: c0,
          },
          id: a0.value,
          type: 'SetRecord',
        },
      ]);
    });

    it('converts multiple ld:supplant', () => {
      const delta: Quadruple[] = [
        [a0, b0, c0, supplant],
        [a0, b1, c1, supplant],
        [a1, b0, c0, supplant],
      ];

      expect(deltaToMessageStream(delta)).toEqual([
        {
          fields: {
            [b0.value]: c0,
            [b1.value]: c1,
          },
          id: a0.value,
          type: 'SetRecord',
        },
        {
          fields: {
            [b0.value]: c0,
          },
          id: a1.value,
          type: 'SetRecord',
        },
      ]);
    });
  });
});
