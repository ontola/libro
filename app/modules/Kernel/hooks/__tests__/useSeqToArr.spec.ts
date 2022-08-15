/* @jest-environment jsdom */

import * as rdfx from '@ontologies/rdf';

import { renderLinkedHook } from '../../../../../tests/test-utils-hooks';
import ex from '../../../../ontology/ex';
import { useSeqToArr } from '../useSeqToArr';

describe('Kernel', () => {
  describe('useSeqToArr', () => {
    it('idles without id', async () => {
      const { result } = await renderLinkedHook(
        () => useSeqToArr(undefined),
        {},
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([]);
    });

    it('loads missing seq', async () => {
      const { result } = await renderLinkedHook(
        () => useSeqToArr(ex.ns('seq')),
        {},
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(true);
      expect(items).toEqual([]);
    });

    it('converts empty seq', async () => {
      const { result } = await renderLinkedHook(
        () => useSeqToArr(ex.ns('seq')),
        {
          '@id': ex.ns('seq').value,
          [rdfx.type.toString()]: rdfx.Seq,
        },
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([]);
    });

    it('converts seq with one item', async () => {
      const { result } = await renderLinkedHook(
        () => useSeqToArr(ex.ns('seq')),
        {
          '@id': ex.ns('seq').value,
          [rdfx.type.toString()]: rdfx.Seq,
          [rdfx.ns('_2').value]: ex.ns('2'),
        },
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([ex.ns('2')]);
    });

    it('converts seq with multiple items', async () => {
      const { result } = await renderLinkedHook(
        () => useSeqToArr(ex.ns('seq')),
        {
          '@id': ex.ns('seq').value,
          [rdfx.type.toString()]: rdfx.Seq,
          [rdfx.ns('_2').value]: ex.ns('2'),
          [rdfx.ns('_3').value]: ex.ns('3'),
        },
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([ex.ns('2'), ex.ns('3')]);
    });

    it('orders the elements', async () => {
      const { result } = await renderLinkedHook(
        () => useSeqToArr(ex.ns('seq')),
        {
          '@id': ex.ns('seq').value,
          [rdfx.type.toString()]: rdfx.Seq,
          [rdfx.ns('_220').value]: ex.ns('220'),
          [rdfx.ns('_334').value]: ex.ns('334'),
          [rdfx.ns('_0').value]: ex.ns('0'),
          [rdfx.ns('_21').value]: ex.ns('21'),
          [rdfx.ns('_2').value]: ex.ns('2'),
          [rdfx.ns('_51').value]: ex.ns('51'),
        },
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([
        ex.ns('0'),
        ex.ns('2'),
        ex.ns('21'),
        ex.ns('51'),
        ex.ns('220'),
        ex.ns('334'),
      ]);
    });
  });
});
