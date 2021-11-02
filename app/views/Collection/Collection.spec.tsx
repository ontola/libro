/**
 * @jest-environment jsdom
 */

import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import example from '../../ontology/example';
import ontola from '../../ontology/ontola';
import { cleanup, renderLinked } from '../../test-utils';
import { Page } from '../../topologies/Page';

describe('Collection', () => {
  afterAll(cleanup);

  const ITEMS = 10;

  const collectionWithPages = app.ns('nederland/q/75/m');
  const collectionWithItems = app.ns('nederland/q/75/m?page=1&type=paginated');
  const memberResource = example.ns('nederland/m/177');

  const resources = {
    [collectionWithItems.toString()]: {
      '@id': collectionWithItems,
      [rdfx.type.toString()]: [
        as.CollectionPage,
        ontola.PaginatedView,
      ],
      [as.items.toString()]: seq([memberResource]),
      [as.totalItems.toString()]: rdf.literal(1),
      [ontola.collectionDisplay.toString()]: ontola.ns('collectionDisplay/default'),
    },
    [collectionWithPages.toString()]: {
      '@id': collectionWithPages,
      [rdfx.type.toString()]: [
        as.Collection,
        ontola.Collection,
      ],
      [as.name.toString()]: rdf.literal('Ideeën'),
      [ontola.iriTemplate.toString()]: rdf.literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
      [schema.isPartOf.toString()]: app.ns('nederland/q/75'),
      [as.totalItems.toString()]: rdf.literal(ITEMS),
      [schema.potentialAction.toString()]: app.ns('nederland/q/75/m/new'),
      [ontola.defaultType.toString()]: rdf.literal('paginated'),
      [ontola.pages.toString()]: collectionWithItems,
      [dcterms.identifier.toString()]: app.ns('nederland/q/75/motions'),
      [ontola.createAction.toString()]: app.ns('nederland/q/75/m/new'),
      [schema.url.toString()]: collectionWithPages,
      [ontola.baseCollection.toString()]: app.ns('new_volunteers'),
      [ontola.collectionDisplay.toString()]: ontola.ns('collectionDisplay/default'),
      [ontola.collectionType.toString()]: ontola.ns('collectionType/paginated'),
      [as.first.toString()]: collectionWithItems,
      [as.last.toString()]: app.ns('nederland/q/75/m?page=2&type=paginated'),
    },
    [memberResource.toString()]: {
      '@id': memberResource,
      [rdfx.type.toString()]: example.ns('TestClass'),
      [schema.name.toString()]: rdf.literal('Member name'),
      [schema.text.toString()]: rdf.literal('Member text'),
    },
  };

  it('renders the views', async () => {
    const { getByText } = await renderLinked((
      <Page>
        <Resource subject={collectionWithPages} />
      </Page>
    ), { resources });

    expect(getByText('Member name')).toBeVisible();
  });
});
