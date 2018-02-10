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
    [NS.schema('name')]: new Literal('Notifications'),
    [NS.hydra('operation')]: NS.app('n/actions/new?type=infinite&before=2018-02-10%2012%3A06%3A29'),
    [NS.argu('first')]: NS.app('n?type=infinite&before=2018-02-10%2012%3A06%3A29'),
    [NS.argu('members')]: memberResource,
    [NS.argu('newAction')]: NS.app('n/actions/new?type=infinite&before=2018-02-10%2012%3A06%3A29'),
    [NS.argu('next')]: NS.app('n?type=infinite&before=2017-09-16%2009%3A44%3A16'),
    [NS.argu('pageSize')]: Literal.fromNumber(PAGES),
    [NS.argu('parentView')]: NS.app('n?type=infinite'),
    [NS.argu('totalCount')]: Literal.fromNumber(PAGES),
  },
  [collectionWithViews]: {
    [NS.rdf('type')]: NS.argu('Collection'),
    [NS.dc('identifier')]: NS.example('n?type=infinite'),
    [NS.schema('name')]: new Literal('Notifications'),
    [NS.hydra('operation')]: NS.app('n/actions/new?type=infinite'),
    [NS.argu('first')]: NS.app('n?type=infinite&before=2018-02-10%2011%3A18%3A19'),
    [NS.argu('newAction')]: NS.app('n/actions/new?type=infinite'),
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
