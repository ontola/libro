/* @jest-environment jsdom */

import * as rdfx from '@ontologies/rdf';

import { renderLinkedHook } from '../../../../../tests/test-utils-hooks';
import example from '../../ontology/example';
import { useListToArr } from '../useListToArr';

describe('Kernel', () => {
  describe('useListToArr', () => {
    it('loads missing list', async () => {
      const { result } = await renderLinkedHook(
        () => useListToArr(example.ns('list')),
        {},
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(true);
      expect(items).toEqual([]);
    });

    it('converts empty list', async () => {
      const { result } = await renderLinkedHook(
        () => useListToArr(rdfx.nil),
        {},
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([]);
    });

    it('converts list with one item', async () => {
      const { result } = await renderLinkedHook(
        () => useListToArr(example.ns('list')),
        {
          '@id': example.ns('list').value,
          [rdfx.type.toString()]: rdfx.List,
          [rdfx.first.value]: example.ns('1'),
          [rdfx.rest.value]: rdfx.nil,
        },
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([example.ns('1')]);
    });

    it('converts list with multiple items', async () => {
      const { result } = await renderLinkedHook(
        () => useListToArr(example.ns('list')),
        [
          {
            '@id': example.ns('list').value,
            [rdfx.type.toString()]: rdfx.List,
            [rdfx.first.value]: example.ns('2'),
            [rdfx.rest.value]: example.ns('list/1'),
          },
          {
            '@id': example.ns('list/1').value,
            [rdfx.type.toString()]: rdfx.List,
            [rdfx.first.value]: example.ns('3'),
            [rdfx.rest.value]: rdfx.nil,
          },
        ],
        { modules: [] },
      );
      const [items, loading] = result.current;

      expect(loading).toEqual(false);
      expect(items).toEqual([example.ns('2'), example.ns('3')]);
    });
  });
});
