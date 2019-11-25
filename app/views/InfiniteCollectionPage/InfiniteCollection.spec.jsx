import as from '@ontologies/as';
import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import dcterms from '@ontologies/dcterms';
import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import React from 'react';

import { NS } from '../../../tests';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';
import collectionComponents from '../Collection/index';
import collectionPageComponents from '../CollectionPage/index';

import components from './index';

const testClass = LinkedRenderStore.registerRenderer(
  link({ name: as.name })(({ name }) => <p className="testComp">{name.value}</p>),
  NS.example('TestClass'),
  RENDER_CLASS_NAME,
  allTopologies
);

const ITEMS = 10;

const collection = NS.example('nederland/q/75/m');
const collectionPageWithItems = NS.app('current_page');
const memberResource = NS.example('nederland/m/177');

const resources = {
  [collection]: {
    [rdfx.type]: [
      as.Collection,
      ontola.Collection,
    ],
    [as.name]: rdf.literal('Ideeën'),
    [ontola.iriTemplate]: rdf.literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
    [schema.isPartOf]: NS.app('nederland/q/75'),
    [as.totalItems]: rdf.literal(ITEMS),
    [schema.potentialAction]: NS.app('nederland/q/75/m/new'),
    [ontola.defaultType]: rdf.literal('infinite'),
    [ontola.pages]: collectionPageWithItems,
    [dcterms.identifier]: NS.app('nederland/q/75/motions'),
    [ontola.createAction]: NS.app('nederland/q/75/m/new'),
    [schema.url]: collection,
    [ontola.baseCollection]: NS.app('new_volunteers'),
    [ontola.collectionDisplay]: NS.ontola('collectionDisplay/default'),
    [ontola.collectionType]: NS.ontola('collectionType/infinite'),
    [as.first]: collectionPageWithItems,
    [as.last]: NS.app('nederland/q/75/m?page=2&type=infinite'),
  },
  [collectionPageWithItems]: {
    [rdfx.type]: [
      as.CollectionPage,
      ontola.InfiniteView,
    ],
    [as.next]: NS.app('nederland/q/75/m?type=infinite&before=2018-02-10%2011%3A18%3A19'),
    [as.totalItems]: rdf.literal(ITEMS),
    [dcterms.identifier]: NS.app('nederland/q/75/motions'),
    [as.partOf]: collection,
    [as.items]: [
      memberResource,
      NS.app('nederland/m/158'),
      NS.app('nederland/m/537'),
      NS.app('nederland/m/175'),
      NS.app('nederland/m/577'),
      NS.app('nederland/m/253'),
      NS.app('nederland/m/687'),
    ],
  },
  [memberResource]: {
    [rdfx.type]: NS.example('TestClass'),
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
