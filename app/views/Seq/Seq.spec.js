import rdf, { createNS } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';

import { NS } from '../../../tests';
import ontola from '../../ontology/ontola';

import components from './index';

const resource = rdf.blankNode('g70120412320900');

const testNS = createNS('https://argu.dev/');

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
    [rdfx.type]: rdfx.Seq,
    [NS.rdf('_5')]: testNS('menus/info#contact'),
    [NS.rdf('_2')]: testNS('menus/info#governments'),
    [NS.rdf('_0')]: testNS('menus/info#about'),
    [NS.rdf('_3')]: testNS('menus/info#press_media'),
    [NS.rdf('_4')]: testNS('menus/info#support'),
    [NS.rdf('_1')]: testNS('menus/info#team'),
  },
  [testNS('menus/info#about')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.isPartOf]: testNS('menus/info'),
    [ontola.href]: rdf.namedNode('https://argu.dev/i/about'),
    [schema.name]: rdf.literal('Over Argu'),
  },
  [testNS('menus/info#team')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.isPartOf]: testNS('menus/info'),
    [ontola.href]: rdf.namedNode('https://argu.dev/i/team'),
    [schema.name]: rdf.literal('Ons team'),
  },
  [testNS('menus/info#governments')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.isPartOf]: testNS('menus/info'),
    [ontola.href]: rdf.namedNode('https://argu.dev/i/governments'),
    [schema.name]: rdf.literal('Argu voor overheden'),
  },
  [testNS('menus/info#press_media')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.isPartOf]: testNS('menus/info'),
    [ontola.href]: rdf.namedNode('https://argu.pr.co'),
    [schema.name]: rdf.literal('Pers & media'),
  },
  [testNS('menus/info#support')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.isPartOf]: testNS('menus/info'),
    [ontola.href]: rdf.namedNode('https://argu.freshdesk.com/support/home'),
    [schema.name]: rdf.literal('Help & support'),
  },
  [testNS('menus/info#contact')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.isPartOf]: testNS('menus/info'),
    [ontola.href]: rdf.namedNode('https://argu.dev/i/contact'),
    [schema.name]: rdf.literal('Contact'),
  },
};

const children = Object.keys(resources[resource]).length - 1;

describeView('Seq', components, resources, resource, () => {
  it('renders the children', () => {
    expect(subject.find('Seq').children()).toHaveLength(children);
  });

  describe('#sequences', () => {
    it('filters its data', () => {
      const result = subject.find('Seq > ForwardRef > Resource');
      expect(result).toHaveLength(children);
    });

    it('orders its data', () => {
      const results = subject.find('Seq > ForwardRef > Resource');

      expect(results).toHaveLength(seq.length);
      for (let i = 0; i < children; i++) {
        expect(results.at(i)).toHaveProp('subject', seq[i]);
      }
    });
  });
});
