/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';
import { useLRS } from 'link-redux';

import { renderLinkedHook } from '../../../../../../../tests/test-utils-hooks';
import ontola from '../../../../../../ontology/ontola';
import { useIRITemplate } from '../../../../../Common/hooks/useIRITemplate';
import { filteredCollectionIRI } from '../filteredCollectionIRI';
import { FilterValue } from '../FilterValue';

describe('filteredCollectionIRI', () => {
  const base = rdf.namedNode('https://argu.localdev/argu/nederland/discussions');
  const data = {
    '@id': 'https://argu.localdev/argu/nederland/discussions',
    [ontola.iriTemplate.toString()]: 'https://argu.localdev/argu/nederland/discussions{?before%5B%5D*,display,filter%5B%5D*,iri,sort%5B%5D*,page,page_size,title,type}{#fragment}',
    [ontola.iriTemplateOpts.toString()]: '',
  };

  const conceptIsFalse = {
    key: rdf.blankNode('b133'),
    value: rdf.literal(false),
  };

  const pinnedIsTrue = {
    key: rdf.blankNode('b4'),
    value: rdf.literal(true),
  };

  const pinnedIsFalse = {
    key: rdf.blankNode('b131'),
    value: rdf.literal(false),
  };

  const testFunction = async (filters: FilterValue[]) => await renderLinkedHook(() => {
    const iriTemplate = useIRITemplate(base);
    const lrs = useLRS();

    return filteredCollectionIRI(lrs, filters, iriTemplate);
  }, data);

  it('returns base iri without filters', async () => {
    const { result } = await testFunction([]);

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions'));
  });

  it('returns base iri plus one filter', async () => {
    const { result } = await testFunction([pinnedIsTrue]);

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dtrue'));
  });

  it('returns base iri plus two filters', async () => {
    const { result } = await testFunction([pinnedIsTrue, conceptIsFalse]);

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dtrue&filter%5B%5D=%3Dfalse'));
  });

  it('returns base iri plus two filters not sorted', async () => {
    const { result } = await testFunction([conceptIsFalse, pinnedIsTrue]);

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dfalse&filter%5B%5D=%3Dtrue'));
  });

  it('returns base iri plus two filters in the same field', async () => {
    const { result } = await testFunction([pinnedIsTrue, pinnedIsFalse]);

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dtrue&filter%5B%5D=%3Dfalse'));
  });
});
