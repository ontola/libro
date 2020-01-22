import as from '@ontologies/as';
import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import dcterms from '@ontologies/dcterms';
import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import example from '../../ontology/example';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import collectionComponents from '../Collection/index';
import collectionPageComponents from '../CollectionPage/index';

import components from './index';

const testClass = LinkedRenderStore.registerRenderer(
  link({ name: as.name })(({ name }) => <p className="testComp">{name.value}</p>),
  example.ns('TestClass'),
  RENDER_CLASS_NAME,
  allTopologies
);

const ITEMS = 10;

const collection = example.ns('nederland/q/75/m');
const collectionPageWithItems = app.ns('current_page');
const memberResource = example.ns('nederland/m/177');

const resources = {
  [collection]: {
    [rdfx.type]: [
      as.Collection,
      ontola.Collection,
    ],
    [as.name]: rdf.literal('Ideeën'),
    [ontola.iriTemplate]: rdf.literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
    [schema.isPartOf]: app.ns('nederland/q/75'),
    [as.totalItems]: rdf.literal(ITEMS),
    [schema.potentialAction]: app.ns('nederland/q/75/m/new'),
    [ontola.defaultType]: rdf.literal('infinite'),
    [ontola.pages]: collectionPageWithItems,
    [dcterms.identifier]: app.ns('nederland/q/75/motions'),
    [ontola.createAction]: app.ns('nederland/q/75/m/new'),
    [schema.url]: collection,
    [ontola.baseCollection]: app.ns('new_volunteers'),
    [ontola.collectionDisplay]: ontola.ns('collectionDisplay/default'),
    [ontola.collectionType]: ontola.ns('collectionType/infinite'),
    [as.first]: collectionPageWithItems,
    [as.last]: app.ns('nederland/q/75/m?page=2&type=infinite'),
  },
  [collectionPageWithItems]: {
    [rdfx.type]: [
      as.CollectionPage,
      ontola.InfiniteView,
    ],
    [as.next]: app.ns('nederland/q/75/m?type=infinite&before=2018-02-10%2011%3A18%3A19'),
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
  },
  [memberResource]: {
    [rdfx.type]: example.ns('TestClass'),
    [as.name]: rdf.literal('Member name'),
    [as.summary]: rdf.literal('Member text'),
  },
};

describe('Collection', () => {
  describeView('CollectionPage', [testClass, ...components, ...collectionComponents, ...collectionPageComponents], resources, collectionPageWithItems, () => {
    it('renders the members', () => {
      expect(subject.find('CollectionPage').find('p.testComp')).toHaveText('Member name');
      expect(subject.find('.Container').find('button')).toHaveText('Load more');
    });
  });
});
