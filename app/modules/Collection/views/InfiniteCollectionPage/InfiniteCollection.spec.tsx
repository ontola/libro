/**
 * @jest-environment jsdom
 */

import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { Resource } from 'link-redux';
import React from 'react';

import { renderLinked } from '../../../../../tests/test-utils';
import Common from '../../../Common';
import Page from '../../../Common/topologies/Page';
import app from '../../../Common/ontology/app';
import example from '../../../Kernel/ontology/example';
import ontola from '../../../Kernel/ontology/ontola';
import CollectionModule from '../../index';

const ITEMS = 10;

describe('Collection', () => {
  const collectionIRI = example.ns('nederland/q/75/m');
  const memberResource = {
    '@id': example.ns('nederland/m/177'),
    [rdfx.type.toString()]: example.ns('TestClass'),
    [schema.name.toString()]: rdf.literal('Member name'),
  };
  const collectionPageIRI = app.ns('current_page');
  const collectionPage = {
    '@id': collectionPageIRI,
    [rdfx.type.toString()]: [
      as.CollectionPage,
      ontola.InfiniteView,
    ],
    [as.next.toString()]: app.ns('nederland/q/75/m?type=infinite&before=2018-02-10%2011%3A18%3A19'),
    [as.totalItems.toString()]: rdf.literal(ITEMS),
    [dcterms.identifier.toString()]: app.ns('nederland/q/75/motions'),
    [as.partOf.toString()]: collectionIRI,
    [as.items.toString()]: [
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
    '@id': collectionIRI.value,
    [rdfx.type.toString()]: [
      as.Collection,
      ontola.Collection,
    ],
    [as.name.toString()]: rdf.literal('Ideeën'),
    [ontola.iriTemplate.toString()]: rdf.literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
    [schema.isPartOf.toString()]: app.ns('nederland/q/75'),
    [as.totalItems.toString()]: rdf.literal(ITEMS),
    [schema.potentialAction.toString()]: app.ns('nederland/q/75/m/new'),
    [ontola.defaultType.toString()]: rdf.literal('infinite'),
    [ontola.pages.toString()]: collectionPage,
    [dcterms.identifier.toString()]: app.ns('nederland/q/75/motions'),
    [ontola.createAction.toString()]: app.ns('nederland/q/75/m/new'),
    [schema.url.toString()]: collectionIRI,
    [ontola.baseCollection.toString()]: app.ns('new_volunteers'),
    [ontola.collectionDisplay.toString()]: ontola.ns('collectionDisplay/default'),
    [ontola.collectionType.toString()]: ontola.ns('collectionType/infinite'),
    [as.first.toString()]: collectionPageIRI,
    [as.last.toString()]: app.ns('nederland/q/75/m?page=2&type=infinite'),
  };

  it('renders the members', async () => {
    const {
      getByText,
    } = await renderLinked(
      ({ iri }) => (
        <Page>
          <Resource
            forceRender
            subject={iri}
          />
        </Page>
      ),
      {
        modules: [
          Common,
          CollectionModule,
        ],
        resources, 
      },
    );

    expect(getByText('Member name')).toBeVisible();
    expect(getByText('Load more')).toBeVisible();
  });
});
