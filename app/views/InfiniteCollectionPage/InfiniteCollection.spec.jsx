import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import { BlankNode, Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests';
import { allTopologies } from '../../topologies';
import Sequence from '../Seq/index';

import components from './index';

const testClass = LinkedRenderStore.registerRenderer(
  link([NS.schema('name')])(({ name }) => <p className="testComp">{name.value}</p>),
  NS.example('TestClass'),
  RENDER_CLASS_NAME,
  allTopologies
);

const PAGES = 10;

const collectionWithMembers = NS.example('n&type=infinite&before=2018-02-10%2011%3A18%3A19');
const memberResource = NS.example('n/142');
const memberSequence = new BlankNode();

const resources = {
  [collectionWithMembers]: {
    [NS.rdf('type')]: NS.argu('InfiniteCollectionView'),
    [NS.schema('name')]: new Literal('Notifications'),
    [NS.schema('potentialAction')]: NS.app('n/actions/new?type=infinite&before=2018-02-10%2012%3A06%3A29'),
    [NS.as('first')]: NS.app('n?type=infinite&before=2018-02-10%2012%3A06%3A29'),
    [NS.as('items')]: memberResource,
    [NS.argu('newAction')]: NS.app('n/actions/new?type=infinite&before=2018-02-10%2012%3A06%3A29'),
    [NS.as('next')]: NS.app('n?type=infinite&before=2017-09-16%2009%3A44%3A16'),
    [NS.argu('pageSize')]: Literal.fromNumber(PAGES),
    [NS.argu('parentView')]: NS.app('n?type=infinite'),
    [NS.as('totalItems')]: Literal.fromNumber(PAGES),
  },
  [memberResource]: {
    [NS.rdf('type')]: NS.example('TestClass'),
    [NS.schema('name')]: new Literal('Member name'),
    [NS.schema('text')]: new Literal('Member text'),
  },
  [memberSequence]: {
    [NS.rdf('type')]: NS.rdf('Seq'),
    [NS.rdf('_0')]: memberResource,
  },
};

describeView('InfiniteCollectionView', [testClass, ...components, ...Sequence], resources, collectionWithMembers, () => {
  it('renders the members through the views', () => {
    expect(subject.find('p.testComp')).toHaveText('Member name');
  });
});
