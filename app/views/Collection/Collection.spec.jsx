import * as as from '@ontologies/as';
import * as rdfx from '@ontologies/rdf';
import rdf from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as schema from '@ontologies/schema';
import { seq } from 'link-lib';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import example from '../../ontology/example';
import ontola from '../../ontology/ontola';
import { cleanup, render } from '../../test-utils';
import { Page } from '../../topologies/Page';


describe('Collection', () => {
  afterAll(cleanup);

  const ITEMS = 10;

  const collectionWithPages = app.ns('nederland/q/75/m');
  const collectionWithItems = app.ns('nederland/q/75/m?page=1&type=paginated');
  const memberResource = example.ns('nederland/m/177');

  const resources = {
    [collectionWithItems]: {
      '@id': collectionWithItems,
      [rdfx.type]: [
        as.CollectionPage,
        ontola.PaginatedView,
      ],
      [as.items]: seq([memberResource]),
      [as.totalItems]: rdf.literal(1),
      [ontola.collectionDisplay]: ontola.ns('collectionDisplay/default'),
    },
    [collectionWithPages]: {
      '@id': collectionWithPages,
      [rdfx.type]: [
        as.Collection,
        ontola.Collection,
      ],
      [as.name]: rdf.literal('Ideeën'),
      [ontola.iriTemplate]: rdf.literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
      [schema.isPartOf]: app.ns('nederland/q/75'),
      [as.totalItems]: rdf.literal(ITEMS),
      [schema.potentialAction]: app.ns('nederland/q/75/m/new'),
      [ontola.defaultType]: rdf.literal('paginated'),
      [ontola.pages]: collectionWithItems,
      [dcterms.identifier]: app.ns('nederland/q/75/motions'),
      [ontola.createAction]: app.ns('nederland/q/75/m/new'),
      [schema.url]: collectionWithPages,
      [ontola.baseCollection]: app.ns('new_volunteers'),
      [ontola.collectionDisplay]: ontola.ns('collectionDisplay/default'),
      [ontola.collectionType]: ontola.ns('collectionType/paginated'),
      [as.first]: collectionWithItems,
      [as.last]: app.ns('nederland/q/75/m?page=2&type=paginated'),
    },
    [memberResource]: {
      '@id': memberResource,
      [rdfx.type]: example.ns('TestClass'),
      [schema.name]: rdf.literal('Member name'),
      [schema.text]: rdf.literal('Member text'),
    },
  };

  const { getByText } = render((
    <Page>
      <Resource subject={collectionWithPages} />
    </Page>
  ), { resources });

  it('renders the views', () => {
    expect(getByText('Member name')).toBeVisible();
  });
});
