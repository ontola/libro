import { memoizedNamespace } from 'link-lib';
import { Type } from 'link-redux';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests/index';

import components, { Seq } from './index';

const resource = new NamedNode('_:g70120412320900');

const testNS = memoizedNamespace('https://argu.dev/');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.rdf('Seq'),
    [NS.rdf('_5')]: testNS('menus/info#contact'),
    [NS.rdf('_2')]: testNS('menus/info#governments'),
    [NS.rdf('_0')]: testNS('menus/info#about'),
    [NS.rdf('_3')]: testNS('menus/info#press_media'),
    [NS.rdf('_4')]: testNS('menus/info#support'),
    [NS.rdf('_1')]: testNS('menus/info#team'),
  },
  [testNS('menus/info#about')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new Literal('https://argu.dev/i/about'),
    [NS.argu('label')]: new Literal('Over Argu'),
  },
  [testNS('menus/info#team')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new Literal('https://argu.dev/i/team'),
    [NS.argu('label')]: new Literal('Ons team'),
  },
  [testNS('menus/info#governments')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new Literal('https://argu.dev/i/governments'),
    [NS.argu('label')]: new Literal('Argu voor overheden'),
  },
  [testNS('menus/info#press_media')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new Literal('https://argu.pr.co'),
    [NS.argu('label')]: new Literal('Pers & media'),
  },
  [testNS('menus/info#support')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new Literal('https://argu.freshdesk.com/support/home'),
    [NS.argu('label')]: new Literal('Help & support'),
  },
  [testNS('menus/info#contact')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new Literal('https://argu.dev/i/contact'),
    [NS.argu('label')]: new Literal('Contact'),
  },
};

const children = Object.keys(resources[resource]).length - 1;

describeView('Seq', components, resources, resource, () => {
  set('ch', () => React.createElement(Type, { label: new NamedNode('http://label.required.bugfix') }));

  it('renders a sequence fragment', () => {
    expect(subject.find(Seq)).toMatchSnapshot();
  });

  it('renders the children', () => {
    expect(subject.find(Seq).children()).toHaveLength(children);
  });

  describe('#sequences', () => {
    it('filters its data', () => {
      const result = subject.find(Seq).instance().sequences();
      expect(result).toHaveLength(children);
    });

    it('orders its data', () => {
      const result = subject.find(Seq).instance().sequences();
      for (let i = 0; i < children; i++) {
        expect(result[i].predicate.value).toEqual(NS.rdf(`_${i}`).value);
      }
    });
  });
});
