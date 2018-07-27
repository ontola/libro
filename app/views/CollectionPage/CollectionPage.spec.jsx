import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import { Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests';
import { allTopologies } from '../../helpers/LinkedRenderStore';

import components from './index';

const testClass = LinkedRenderStore.registerRenderer(
  link([NS.as('name')])(({ name }) => <p className="testComp">{name.value}</p>),
  NS.example('TestClass'),
  RENDER_CLASS_NAME,
  allTopologies
);

const ITEMS = 10;

const collectionWithItems = NS.example('nederland/q/75/m?page=1&type=paginated');
const memberResource = NS.example('nederland/m/177');

const resources = {
  [collectionWithItems]: {
    [NS.rdf('type')]: [
      NS.as('CollectionPage'),
      NS.argu('PaginatedCollectionView'),
    ],
    [NS.as('first')]: NS.app('nederland/q/75/m?page=1&type=paginated'),
    [NS.as('last')]: NS.app('nederland/q/75/m?page=1&type=paginated'),
    [NS.as('totalItems')]: Literal.fromNumber(ITEMS),
    [NS.dc('identifier')]: NS.app('nederland/q/75/motions'),
    [NS.as('partOf')]: NS.app('nederland/q/75/m'),
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
  describeView('CollectionPage', [testClass, ...components], resources, collectionWithItems, () => {
    it('renders the members', () => {
      expect(subject.find('CollectionPage').find('p.testComp')).toHaveText('Member name');
    });
  });
});
