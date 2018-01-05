import { Type } from 'link-redux';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests/index';

import components, { Seq } from './index';

const resource = new NamedNode('_:g70120412320900');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.rdf('Seq'),
    [NS.rdf('_5')]: new NamedNode('https://argu.dev/menus/info#contact'),
    [NS.rdf('_2')]: new NamedNode('https://argu.dev/menus/info#governments'),
    [NS.rdf('_0')]: new NamedNode('https://argu.dev/menus/info#about'),
    [NS.rdf('_3')]: new NamedNode('https://argu.dev/menus/info#press_media'),
    [NS.rdf('_4')]: new NamedNode('https://argu.dev/menus/info#support'),
    [NS.rdf('_1')]: new NamedNode('https://argu.dev/menus/info#team'),
  },
  [new NamedNode('https://argu.dev/menus/info#about')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/info'),
    [NS.argu('href')]: new Literal('https://argu.dev/i/about'),
    [NS.argu('label')]: new Literal('Over Argu'),
  },
  [new NamedNode('https://argu.dev/menus/info#team')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/info'),
    [NS.argu('href')]: new Literal('https://argu.dev/i/team'),
    [NS.argu('label')]: new Literal('Ons team'),
  },
  [new NamedNode('https://argu.dev/menus/info#governments')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/info'),
    [NS.argu('href')]: new Literal('https://argu.dev/i/governments'),
    [NS.argu('label')]: new Literal('Argu voor overheden'),
  },
  [new NamedNode('https://argu.dev/menus/info#press_media')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/info'),
    [NS.argu('href')]: new Literal('https://argu.pr.co'),
    [NS.argu('label')]: new Literal('Pers & media'),
  },
  [new NamedNode('https://argu.dev/menus/info#support')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/info'),
    [NS.argu('href')]: new Literal('https://argu.freshdesk.com/support/home'),
    [NS.argu('label')]: new Literal('Help & support'),
  },
  [new NamedNode('https://argu.dev/menus/info#contact')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/info'),
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
        expect(result[i].predicate).toEqual(NS.rdf(`_${i}`));
      }
    });
  });
});
