/**
 * @jest-environment jsdom
 */

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
import { renderLinked } from '../test-utils';

describe('Search', () => {
  const testIRI = example.ns('test/search?q=keyword');
  const firstPage = example.ns('test/search?q=keyword&page=1');
  const seqIRI = example.ns('test/search/results');
  const baseCollection = example.ns('test/search');

  const resources = {
    '@id': testIRI.value,
    [rdfx.type.toString()]: ontola.SearchResult,
    [ontola.baseCollection.toString()]: baseCollection,
    [ontola.collectionDisplay.toString()]: ontola['collectionDisplay/grid'],
    [ontola.collectionType.toString()]: ontola['collectionType/paginated'],
    [ontola.iriTemplate.toString()]: example.ns('test/search{?q,filter%5B%5D*,sort%5B%5D*,page,page_size}{#fragment}').value,
    [dcterms.identifier.toString()]: testIRI,
    [ontola.query.toString()]: 'keyword',
    [as.totalItems.toString()]: 3,
    [as.name.toString()]: '3 results found',
    [as.first.toString()]: firstPage,
    [as.last.toString()]: firstPage,
    [ontola.pages.toString()]: {
      '@id': firstPage,
      [rdfx.type.toString()]: [
        ontola.PaginatedView,
        as.CollectionPage,
      ],
      [ontola.collectionDisplay.toString()]: ontola['collectionDisplay/grid'],
      [ontola.baseCollection.toString()]: baseCollection,
      [as.partOf.toString()]: testIRI.value,
      [as.totalItems.toString()]: 3,
      [as.items.toString()]: seq([
        {
          '@id': example.ns('1'),
          [rdfx.type.toString()]: schema.CreativeWork,
          [schema.name.toString()]: 'Item 1',
        },
        {
          '@id': example.ns('2'),
          [rdfx.type.toString()]: argu.Question,
          [schema.name.toString()]: 'Item 2',
        },
        {
          '@id': example.ns('3'),
          [rdfx.type.toString()]: schema.Thing,
          [schema.name.toString()]: 'Item 3',
        },
      ], seqIRI),
    },
  };

  describe('within Page', () => {
    it('renders the form components', async () => {
      const {
        getByTestId,
        getByText,
      } = await renderLinked(({ iri }) => (
        <Page>
          <Resource
            forceRender
            subject={iri}
          />
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
