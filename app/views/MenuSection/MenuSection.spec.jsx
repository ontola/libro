import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';

import { NS } from '../../../tests';
import { navbarTopology } from '../../topologies/Navbar';

import components from './index';

const resource = rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums');

const resources = {
  [resource]: {
    [rdfx.type]: NS.argu('MenuSection'),
    [schema.name]: rdf.literal('Forum'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations'),
    [NS.ontola('menuItems')]: [
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.motions'),
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.questions'),
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.settings'),
    ],
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.motions')]: {
    [rdfx.type]: NS.ontola('MenuItem'),
    [schema.name]: rdf.literal('Ideeën'),
    [NS.ontola('href')]: rdf.namedNode('https://argu.dev/f/utrecht/motions'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [schema.image]: rdf.namedNode('http://fontawesome.io/icon/lightbulb-o'),
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.questions')]: {
    [rdfx.type]: NS.ontola('MenuItem'),
    [schema.name]: rdf.literal('Vraagstukken'),
    [NS.ontola('href')]: rdf.namedNode('https://argu.dev/f/utrecht/questions'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [schema.image]: rdf.namedNode('http://fontawesome.io/icon/question'),
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.settings')]: {
    [rdfx.type]: NS.ontola('MenuItem'),
    [schema.name]: rdf.literal('Instellingen'),
    [NS.ontola('href')]: rdf.namedNode('https://argu.dev/utrecht/settings'),
    [schema.isPartOf]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [schema.image]: rdf.namedNode('http://fontawesome.io/icon/gear'),
  },
};

describeView('MenuSection', components, resources, resource, () => {
  as(navbarTopology, () => {
    it('renders a MenuSection', () => {
      expect(subject.find(marker('menu-section'))).toExist();
    });

    it('renders the label', () => {
      expect(subject.find(marker('MenuSectionLabel'))).toExist();
    });
  });
});
