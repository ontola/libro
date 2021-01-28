import * as as from '@ontologies/as';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import * as dcterms from '@ontologies/dcterms';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import argu from '../ontology/argu';
import example from '../ontology/example';
import ontola from '../ontology/ontola';
import { Page } from '../topologies/Page';
import { cleanup, render } from '../test-utils';

describe('Search', () => {
  afterAll(cleanup);

  const testIRI = example.ns('test/search?q=keyword');
  const firstPage = example.ns('test/search?q=keyword&page=1');
  const seqIRI = example.ns('test/search/results');
  const baseCollection = example.ns('test/search');

  const resources = {
    '@id': testIRI.value,
    [rdfx.type]: ontola.SearchResult,
    [ontola.baseCollection]: baseCollection,
    [ontola.collectionDisplay]: ontola['collectionDisplay/grid'],
    [ontola.collectionType]: ontola['collectionType/paginated'],
    [ontola.iriTemplate]: example.ns('test/search{?q,filter%5B%5D*,sort%5B%5D*,page,page_size}{#fragment}').value,
    [dcterms.identifier]: testIRI,
    [ontola.query]: 'keyword',
    [as.totalItems]: 3,
    [as.name]: '3 results found',
    [as.first]: firstPage,
    [as.last]: firstPage,
    [ontola.pages]: {
      '@id': firstPage,
      [rdfx.type]: [
        ontola.PaginatedView,
        as.CollectionPage,
      ],
      [ontola.collectionDisplay]: ontola['collectionDisplay/grid'],
      [ontola.baseCollection]: baseCollection,
      [as.partOf]: testIRI.value,
      [as.totalItems]: 3,
      [as.items]: seq([
        {
          '@id': example.ns('1'),
          [rdfx.type]: schema.CreativeWork,
          [schema.name]: 'Item 1',
        },
        {
          '@id': example.ns('2'),
          [rdfx.type]: argu.Question,
          [schema.name]: 'Item 2',
        },
        {
          '@id': example.ns('3'),
          [rdfx.type]: schema.Thing,
          [schema.name]: 'Item 3',
        },
      ], seqIRI),
    },
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
      expect(getByText('3 results found')).toBeVisible();

      // renders the search results
      expect(getByText('Item 1')).toBeVisible();
      expect(getByText('Item 2')).toBeVisible();
      expect(getByText('Item 3')).toBeVisible();
    });
  });
});
