import as from '@ontologies/as';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import dcterms from '@ontologies/dcterms';
import {
  defaultNS as NS,
  seq,
} from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import argu from '../ontology/argu';
import { Page } from '../topologies/Page';
import { cleanup, render } from '../test-utils';

describe('Search', () => {
  afterAll(cleanup);

  const testIRI = NS.example('test/search?q=keyword');
  const seqIRI = NS.example('test/search/results');

  const resources = {
    '@id': testIRI.value,
    [rdfx.type]: argu.SearchResult,
    [dcterms.identifier]: testIRI,
    [argu.query]: 'keyword',
    [argu.took]: 240,
    [as.totalItems]: 3,
    [as.items]: seq([
      {
        '@id': NS.example('1'),
        [rdfx.type]: schema.CreativeWork,
        [schema.name]: 'Item 1',
      },
      {
        '@id': NS.example('2'),
        [rdfx.type]: argu.Question,
        [schema.name]: 'Item 2',
      },
      {
        '@id': NS.example('3'),
        [rdfx.type]: schema.Thing,
        [schema.name]: 'Item 3',
      },
    ], seqIRI),
  };

  describe('within Page', () => {
    it('renders the form components', () => {
      const {
        getByTestId,
        getByText,
      } = render(({ iri }) => (
        <Page>
          <Resource forceRender subject={iri} />
        </Page>
      ), { resources });

      const form = getByTestId('search-form');

      // renders the search form
      expect(form).toHaveFormValues({
        q: 'keyword',
      });

      // renders the search button
      expect(getByText('Search')).toBeVisible();

      // renders the search info
      expect(getByText('3 results in 240ms')).toBeVisible();

      // renders the search results
      expect(getByText('Item 1')).toBeVisible();
      expect(getByText('Item 2')).toBeVisible();
      expect(getByText('Item 3')).toBeVisible();
    });
  });
});
