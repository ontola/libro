import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import example from '../../ontology/example';
import ontola from '../../ontology/ontola';
import {
  cleanup,
  render,
  wait,
} from '../../test-utils';
import { Page } from '../../topologies/Page';

const ITEMS = 10;

const collection = example.ns('nederland/q/75/m');

describe('Collection', () => {
  afterAll(cleanup);

  const memberResource = {
    '@id': example.ns('nederland/m/177'),
    [rdfx.type]: example.ns('TestClass'),
    [schema.name]: rdf.literal('Member name'),
  };

  const collectionPageIRI = app.ns('current_page');
  const collectionPage = {
    '@id': collectionPageIRI,
    [rdfx.type]: [
      as.CollectionPage,
      ontola.PaginatedView,
    ],
    [as.first]: app.ns('nederland/q/75/m?page=1&type=paginated'),
    [as.last]: app.ns('nederland/q/75/m?page=1&type=paginated'),
    [as.totalItems]: rdf.literal(ITEMS),
    [dcterms.identifier]: app.ns('nederland/q/75/motions'),
    [as.partOf]: collection,
    [as.items]: [
      memberResource,
      app.ns('nederland/m/158'),
      app.ns('nederland/m/537'),
      app.ns('nederland/m/175'),
      app.ns('nederland/m/577'),
      app.ns('nederland/m/253'),
      app.ns('nederland/m/687'),
    ],
  };

  const resources = {
    '@id': collection.value,
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
    [ontola.pages]: collectionPage,
    [dcterms.identifier]: app.ns('nederland/q/75/motions'),
    [ontola.createAction]: app.ns('nederland/q/75/m/new'),
    [schema.url]: collection,
    [ontola.baseCollection]: app.ns('new_volunteers'),
    [ontola.collectionDisplay]: ontola.ns('collectionDisplay/default'),
    [ontola.collectionType]: ontola.ns('collectionType/paginated'),
    [as.first]: collectionPageIRI,
    [as.last]: app.ns('nederland/q/75/m?page=2&type=paginated'),
  };

  it('renders the members', async () => {
    const {
      queryByTestId,
      queryByText,
    } = await render(
      ({ iri }) => (
        <Page>
          <Resource forceRender subject={iri} />
        </Page>
      ),
      { resources }
    );

    await wait();

    expect(queryByText('Member name')).toBeVisible();
    expect(queryByTestId('paginationWrapper')).toBeVisible();
  });
});
