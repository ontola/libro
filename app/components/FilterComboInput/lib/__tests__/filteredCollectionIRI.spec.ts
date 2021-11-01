/**
 * @jest-environment jsdom
 */

import rdf, {
  BlankNode,
  Literal,
} from '@ontologies/core';
import { renderHook } from '@testing-library/react-hooks';

import { useIRITemplate } from '../../../../hooks/useIRITemplate';
import ontola from '../../../../ontology/ontola';
import { createHookWrapper } from '../../../../test-utils-hooks';
import { filteredCollectionIRI } from '../filteredCollectionIRI';
import { FilterValue } from '../FilterValue';

describe('filteredCollectionIRI', () => {
  const base = rdf.namedNode('https://argu.localdev/argu/nederland/discussions');
  const data = {
    '@id': 'https://argu.localdev/argu/nederland/discussions',
    [ontola.iriTemplate.toString()]: 'https://argu.localdev/argu/nederland/discussions{?before%5B%5D*,display,filter%5B%5D*,iri,sort%5B%5D*,page,page_size,title,type}{#fragment}',
    [ontola.iriTemplateOpts.toString()]: '',
  };

  const pinnedIsTrue = {
    key: {
      id: 4069,
      termType: 'BlankNode',
      value: 'b4',
    } as BlankNode,
    value: {
      datatype: {
        id: 1681,
        termType: 'NamedNode',
        value: 'http://www.w3.org/2001/XMLSchema#boolean',
      },
      id: 4101,
      language: '',
      termType: 'Literal',
      uri: 'true',
      value: 'true',
    } as Literal,
  };

  const conceptIsFalse = {
    key: {
      id: 11397,
      termType: 'BlankNode',
      uri: 'b133',
      value: 'b133',
    } as BlankNode,
    value: {
      datatype: {
        id: 1681,
        termType: 'NamedNode',
        uri: 'http://www.w3.org/2001/XMLSchema#boolean',
        value: 'http://www.w3.org/2001/XMLSchema#boolean',
      },
      id: 4042,
      language: '',
      termType: 'Literal',
      uri: 'false',
      value: 'false',
    } as Literal,
  };

  const pinnedIsFalse = {
    key: {
      id: 11393,
      termType: 'BlankNode',
      uri: 'b131',
      value: 'b131',
    } as BlankNode,
    value: {
      datatype:{
        id: 1681,
        termType: 'NamedNode',
        uri: 'http://www.w3.org/2001/XMLSchema#boolean',
        value: 'http://www.w3.org/2001/XMLSchema#boolean',
      },
      id: 4042,
      language: '',
      termType: 'Literal',
      uri: 'false',
      value: 'false',
    } as Literal,
  };

  it('returns base iri without filters', () => {
    const { lrs, wrapper } = createHookWrapper(data);
    const filters: FilterValue[] = [];

    const { result } = renderHook(() => {
      const iriTemplate = useIRITemplate(base);

      return filteredCollectionIRI(lrs, filters, iriTemplate);
    }, { wrapper });

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions'));
  });

  it('returns base iri plus one filter', () => {
    const { lrs, wrapper } = createHookWrapper(data);
    const filters: FilterValue[] = [pinnedIsTrue];

    const { result } = renderHook(() => {
      const iriTemplate = useIRITemplate(base);

      return filteredCollectionIRI(lrs, filters, iriTemplate);
    }, { wrapper });

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dtrue'));
  });

  it('returns base iri plus two filters', () => {
    const { lrs, wrapper } = createHookWrapper(data);
    const filters: FilterValue[] = [pinnedIsTrue, conceptIsFalse];

    const { result } = renderHook(() => {
      const iriTemplate = useIRITemplate(base);

      return filteredCollectionIRI(lrs, filters, iriTemplate);
    }, { wrapper });

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dtrue&filter%5B%5D=%3Dfalse'));
  });

  it('returns base iri plus two filters not sorted', () => {
    const { lrs, wrapper } = createHookWrapper(data);
    const filters: FilterValue[] = [conceptIsFalse, pinnedIsTrue];

    const { result } = renderHook(() => {
      const iriTemplate = useIRITemplate(base);

      return filteredCollectionIRI(lrs, filters, iriTemplate);
    }, { wrapper });

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dfalse&filter%5B%5D=%3Dtrue'));
  });

  it('returns base iri plus two filters in the same field', () => {
    const { lrs, wrapper } = createHookWrapper(data);
    const filters: FilterValue[] = [pinnedIsTrue, pinnedIsFalse];

    const { result } = renderHook(() => {
      const iriTemplate = useIRITemplate(base);

      return filteredCollectionIRI(lrs, filters, iriTemplate);
    }, { wrapper });

    expect(result.current).toEqual(rdf.namedNode('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=%3Dtrue&filter%5B%5D=%3Dfalse'));
  });
});
