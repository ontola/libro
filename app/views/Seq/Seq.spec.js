import {
  BlankNode,
  Literal,
  NamedNode,
  Namespace,
} from 'rdflib';

import { NS } from '../../../tests';

import components from './index';

const resource = new BlankNode('g70120412320900');

const testNS = Namespace('https://argu.dev/');

const seq = [
  testNS('menus/info#about'),
  testNS('menus/info#team'),
  testNS('menus/info#governments'),
  testNS('menus/info#press_media'),
  testNS('menus/info#support'),
  testNS('menus/info#contact'),
];

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
    [NS.argu('href')]: new NamedNode('https://argu.dev/i/about'),
    [NS.schema('name')]: new Literal('Over Argu'),
  },
  [testNS('menus/info#team')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new NamedNode('https://argu.dev/i/team'),
    [NS.schema('name')]: new Literal('Ons team'),
  },
  [testNS('menus/info#governments')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new NamedNode('https://argu.dev/i/governments'),
    [NS.schema('name')]: new Literal('Argu voor overheden'),
  },
  [testNS('menus/info#press_media')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new NamedNode('https://argu.pr.co'),
    [NS.schema('name')]: new Literal('Pers & media'),
  },
  [testNS('menus/info#support')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new NamedNode('https://argu.freshdesk.com/support/home'),
    [NS.schema('name')]: new Literal('Help & support'),
  },
  [testNS('menus/info#contact')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('isPartOf')]: testNS('menus/info'),
    [NS.argu('href')]: new NamedNode('https://argu.dev/i/contact'),
    [NS.schema('name')]: new Literal('Contact'),
  },
};

const children = Object.keys(resources[resource]).length - 1;

describeView('Seq', components, resources, resource, () => {
  it('renders the children', () => {
    expect(subject.find('Seq').children()).toHaveLength(children);
  });

  describe('#sequences', () => {
    it('filters its data', () => {
      const result = subject.find('Seq > LinkedResourceContainer');
      expect(result).toHaveLength(children);
    });

    it('orders its data', () => {
      const results = subject.find('Seq > LinkedResourceContainer');

      expect(results).toHaveLength(seq.length);
      for (let i = 0; i < children; i++) {
        expect(results.at(i)).toHaveProp('subject', seq[i]);
      }
    });
  });
});
