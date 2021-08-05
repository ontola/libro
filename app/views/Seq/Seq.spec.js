import rdf, { createNS } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';

import ontola from '../../ontology/ontola';

import components from './';

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
    [rdfx.ns('_5')]: testNS('menus/info#contact'),
    [rdfx.ns('_2')]: testNS('menus/info#governments'),
    [rdfx.ns('_0')]: testNS('menus/info#about'),
    [rdfx.ns('_3')]: testNS('menus/info#press_media'),
    [rdfx.ns('_4')]: testNS('menus/info#support'),
    [rdfx.ns('_1')]: testNS('menus/info#team'),
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
  it('renders the children', async () => {
    expect((await subject).find('Seq').children()).toHaveLength(children);
  });

  describe('#sequences', () => {
    it('filters its data', async () => {
      const result = (await subject).find('Seq > ErrorBoundary > ForwardRef > Resource');
      expect(result).toHaveLength(children);
    });

    it('orders its data', async () => {
      const results = (await subject).find('Seq > ErrorBoundary > ForwardRef > Resource');

      expect(results).toHaveLength(seq.length);

      for (let i = 0; i < children; i++) {
        expect(results.at(i)).toHaveProp('subject', seq[i]);
      }
    });
  });
});
