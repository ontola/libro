/**
 * @jest-environment jsdom
 */
import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';

import { renderLinkedHook } from '../../../../../tests/test-utils-hooks';
import { useListToArr } from '../../../Core/hooks/useListToArr';

describe('useListToArr', () => {
  it('converts a list', async () => {
    const resource1 = rdf.namedNode('b115');
    const resource2 = rdf.namedNode('b116');
    const resource3 = rdf.namedNode('b117');
    const resource4 = rdf.namedNode('b118');

    const resources = [
      {
        '@id': resource1.value,
        [rdfx.first.toString()]: rdf.literal('img/jpeg'),
        [rdfx.rest.toString()]: resource2,
      },
      {
        '@id': resource2.value,
        [rdfx.first.toString()]: rdf.literal('img/png'),
        [rdfx.rest.toString()]: resource3,
      },
      {
        '@id': resource3.value,
        [rdfx.first.toString()]: rdf.literal('img/webp'),
        [rdfx.rest.toString()]: resource4,
      },
      {
        '@id': resource4.value,
        [rdfx.first.toString()]: rdf.literal('img/svg+xml'),
        [rdfx.rest.toString()]: rdfx.nil,
      },
    ];

    const { result } = await renderLinkedHook(
      () => useListToArr(resource1),
      resources,
    );

    const expectedResult = [[
      rdf.literal('img/jpeg'),
      rdf.literal('img/png'),
      rdf.literal('img/webp'),
      rdf.literal('img/svg+xml'),
    ], false];
    expect(result.current).toEqual(expectedResult);
  });
});
