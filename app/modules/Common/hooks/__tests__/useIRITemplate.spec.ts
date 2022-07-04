/**
 * @jest-environment jsdom
 */

import rdf from '@ontologies/core';

import { renderLinkedHook } from '../../../../../tests/test-utils-hooks';
import ontola from '../../../Kernel/ontology/ontola';
import { useIRITemplate } from '../useIRITemplate';

describe('iriTemplate', () => {
  const base = rdf.namedNode('https://argu.localdev/argu/nederland/discussions');
  const data = {
    '@id': 'https://argu.localdev/argu/nederland/discussions',
    [ontola.iriTemplate.toString()]: 'https://argu.localdev/argu/nederland/discussions{?before%5B%5D*,display,filter%5B%5D*,iri,sort%5B%5D*,page,page_size,title,type}{#fragment}',
    [ontola.iriTemplateOpts.toString()]: '',
  };

  it('handles empty input', async () => {
    const { result } = await renderLinkedHook(() => {
      const iriTemplate = useIRITemplate(base);

      return iriTemplate.set({});
    }, data );

    expect(result.current?.value).toBe('https://argu.localdev/argu/nederland/discussions');
  });

  it('handles one input', async () => {
    const { result } = await renderLinkedHook(() => {
      const iriTemplate = useIRITemplate(base);

      return iriTemplate.set({ 'filter%5B%5D': ['https%3A%2F%2Fargu.co%2Fns%2Fcore%23pinned=true'] } );
    }, data);

    expect(result.current?.value).toBe('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=https%253A%252F%252Fargu.co%252Fns%252Fcore%2523pinned%3Dtrue');
  });

  it('handles two inputs', async () => {
    const { result } = await renderLinkedHook(() => {
      const iriTemplate = useIRITemplate(base);

      return iriTemplate.set({ 'filter%5B%5D': ['https%3A%2F%2Fargu.co%2Fns%2Fcore%23pinned=true', 'https%3A%2F%2Fargu.co%2Fns%2Fcore%23trashed=false'] } );
    }, data);

    expect(result.current?.value).toBe('https://argu.localdev/argu/nederland/discussions?filter%5B%5D=https%253A%252F%252Fargu.co%252Fns%252Fcore%2523pinned%3Dtrue&filter%5B%5D=https%253A%252F%252Fargu.co%252Fns%252Fcore%2523trashed%3Dfalse');
  });
});
