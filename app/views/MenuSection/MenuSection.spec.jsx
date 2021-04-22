import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import components from './index';

const resource = rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums');

const resources = {
  [resource]: {
    [rdfx.type]: argu.MenuSection,
    [schema.name]: rdf.literal('Forum'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations'),
    [ontola.menuItems]: [
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.motions'),
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.questions'),
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.settings'),
    ],
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.motions')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.name]: rdf.literal('Ideeën'),
    [ontola.href]: rdf.namedNode('https://argu.dev/f/utrecht/motions'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [schema.image]: rdf.namedNode('http://fontawesome.io/icon/lightbulb-o'),
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.questions')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.name]: rdf.literal('Vraagstukken'),
    [ontola.href]: rdf.namedNode('https://argu.dev/f/utrecht/questions'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [schema.image]: rdf.namedNode('http://fontawesome.io/icon/question'),
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.settings')]: {
    [rdfx.type]: ontola.MenuItem,
    [schema.name]: rdf.literal('Instellingen'),
    [ontola.href]: rdf.namedNode('https://argu.dev/utrecht/settings'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [schema.image]: rdf.namedNode('http://fontawesome.io/icon/gear'),
  },
};

describeView('MenuSection', components, resources, resource, () => {
  as(navbarTopology, () => {
    it('renders a MenuSection', async () => {
      expect((await subject).find(marker('menu-section'))).toExist();
    });

    it('renders the label', async () => {
      expect((await subject).find(marker('MenuSectionLabel'))).toExist();
    });
  });
});
