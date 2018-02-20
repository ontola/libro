import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import { Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests/index';

import components from './index';

const testClass = LinkedRenderStore.registerRenderer(
  link([NS.schema('name')])(({ name }) => <p className="testComp">{name.value}</p>),
  NS.example('TestClass'),
  RENDER_CLASS_NAME,
  [undefined, NS.argu('collection'), NS.argu('section')]
);

const PAGES = 10;

const collectionWithViews = NS.example('n&type=infinite');
const collectionWithMembers = NS.example('n&type=infinite&page=1');
const memberResource = NS.example('n/142');
const viewResource = NS.example('n&type=infinite&page=2');

const resources = {
  [collectionWithMembers]: {
    [NS.rdf('type')]: NS.argu('Collection'),
    [NS.schema('name')]: new Literal('Motions'),
    [NS.hydra('operation')]: NS.app('nederland/m/actions/new?type=paginated&page=1'),
    [NS.argu('first')]: NS.app('nederland/m?page=1'),
    [NS.argu('last')]: NS.app('nederland/m?page=2'),
    [NS.argu('members')]: memberResource,
    [NS.argu('newAction')]: NS.app('n/actions/new?type=paginated&page=1'),
    [NS.argu('next')]: NS.app('n?type=infinite&before=2017-09-16%2009%3A44%3A16'),
    [NS.argu('pageSize')]: Literal.fromNumber(PAGES),
    [NS.argu('parentView')]: NS.app('nederland/m'),
    [NS.argu('totalCount')]: Literal.fromNumber(PAGES),
  },
  [collectionWithViews]: {
    [NS.rdf('type')]: NS.argu('Collection'),
    [NS.dc('identifier')]: NS.example('nederland/m'),
    [NS.schema('name')]: new Literal('Motions'),
    [NS.hydra('operation')]: NS.app('nederland/m/actions/new?type=paginated'),
    [NS.argu('first')]: NS.app('nederland/m?page=1'),
    [NS.argu('last')]: NS.app('nederland/m?page=2'),
    [NS.argu('newAction')]: NS.app('nederland/m/actions/new?type=paginated'),
    [NS.argu('pageSize')]: Literal.fromNumber(PAGES),
    [NS.argu('views')]: viewResource,
  },
  [memberResource]: {
    [NS.rdf('type')]: NS.example('TestClass'),
    [NS.schema('name')]: new Literal('Member name'),
    [NS.schema('text')]: new Literal('Member text'),
  },
  [viewResource]: {
    [NS.rdf('type')]: NS.example('TestClass'),
    [NS.schema('name')]: new Literal('View name'),
    [NS.schema('text')]: new Literal('View text'),
  },
};

describe('Collection', () => {
  describeView('Collection', [testClass, ...components], resources, collectionWithViews, () => {
    it('renders the views', () => {
      expect(subject.find('p.testComp')).toHaveText('View name');
      expect(subject.find('p.testComp')).not.toHaveText('Member name');
    });
  });

  describeView('Collection', [testClass, ...components], resources, collectionWithMembers, () => {
    it('renders the members', () => {
      expect(subject.find('p.testComp')).toHaveText('Member name');
      expect(subject.find('p.testComp')).not.toHaveText('View name');
    });
  });
});
