import {
  defaultNS as NS,
  seq,
} from 'link-lib';
import { LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { Page } from '../topologies/Page';
import { cleanup, render } from '../test-utils';

describe('Search', () => {
  afterAll(cleanup);

  const testIRI = NS.example('test/search?q=keyword');
  const seqIRI = NS.example('test/search/results');

  const resources = {
    '@id': testIRI.value,
    [NS.rdf.type]: NS.argu('SearchResult'),
    [NS.dc.identifier]: testIRI,
    [NS.argu('query')]: 'keyword',
    [NS.argu('took')]: 240,
    [NS.as.totalItems]: 3,
    [NS.as.items]: seq([
      {
        '@id': NS.example('1'),
        [NS.rdf.type]: NS.schema.CreativeWork,
        [NS.schema.name]: 'Item 1',
      },
      {
        '@id': NS.example('2'),
        [NS.rdf.type]: NS.argu('Question'),
        [NS.schema.name]: 'Item 2',
      },
      {
        '@id': NS.example('3'),
        [NS.rdf.type]: NS.schema.Thing,
        [NS.schema.name]: 'Item 3',
      },
    ], seqIRI),
  };

  describe('within Page', () => {
    const {
      getByTestId,
      getByText,
    } = render(({ iri }) => (
      <Page>
        <LinkedResourceContainer forceRender subject={iri} />
      </Page>
    ), { resources });

    const form = getByTestId('search-form');

    it('renders the search form', () => {
      expect(form).toHaveFormValues({
        q: 'keyword',
      });
    });

    it('renders the search button', () => {
      const button = getByText('Search');

      expect(button).toBeVisible();
    });

    it('renders the search info', () => {
      expect(getByText('3 results in 240ms')).toBeVisible();
    });

    it('renders the search results', () => {
      expect(getByText('Item 1')).toBeVisible();
      expect(getByText('Item 2')).toBeVisible();
      expect(getByText('Item 3')).toBeVisible();
    });
  });
});
