import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import { Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests';
import { allTopologies } from '../../topologies';
import collectionComponents from '../Collection/index';
import collectionPageComponents from '../CollectionPage/index';

import components from './index';

const testClass = LinkedRenderStore.registerRenderer(
  link([NS.as('name')])(({ name }) => <p className="testComp">{name.value}</p>),
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
    [NS.rdf('type')]: [
      NS.as('Collection'),
      NS.ontola('Collection'),
    ],
    [NS.as('name')]: new Literal('Ideeën'),
    [NS.ontola('iriTemplate')]: new Literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
    [NS.schema('isPartOf')]: NS.app('nederland/q/75'),
    [NS.as('totalItems')]: Literal.fromNumber(ITEMS),
    [NS.schema('potentialAction')]: NS.app('nederland/q/75/m/new'),
    [NS.ontola('defaultType')]: new Literal('infinite'),
    [NS.as('pages')]: collectionPageWithItems,
    [NS.dc('identifier')]: NS.app('nederland/q/75/motions'),
    [NS.ontola('createAction')]: NS.app('nederland/q/75/m/new'),
    [NS.schema('url')]: collection,
    [NS.ontola('baseCollection')]: NS.app('new_volunteers'),
    [NS.ontola('collectionDisplay')]: NS.ontola('collectionDisplay/default'),
    [NS.ontola('collectionType')]: NS.ontola('collectionType/infinite'),
    [NS.as('first')]: collectionPageWithItems,
    [NS.as('last')]: NS.app('nederland/q/75/m?page=2&type=infinite'),
  },
  [collectionPageWithItems]: {
    [NS.rdf('type')]: [
      NS.as('CollectionPage'),
      NS.ontola('InfiniteView'),
    ],
    [NS.as('next')]: NS.app('nederland/q/75/m?type=infinite&before=2018-02-10%2011%3A18%3A19'),
    [NS.as('totalItems')]: Literal.fromNumber(ITEMS),
    [NS.dc('identifier')]: NS.app('nederland/q/75/motions'),
    [NS.as('partOf')]: collection,
    [NS.as('items')]: [
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
    [NS.rdf('type')]: NS.example('TestClass'),
    [NS.as('name')]: new Literal('Member name'),
    [NS.as('summary')]: new Literal('Member text'),
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
