import rdf from '@ontologies/core';

import { NS } from '../../../tests';
import { navbarTopology } from '../../topologies/Navbar';

import components from './index';

const resource = rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.argu('MenuSection'),
    [NS.schema('name')]: rdf.literal('Forum'),
    [NS.schema('isPartOf')]: rdf.namedNode('https://argu.dev/o/1/menus/navigations'),
    [NS.ontola('menuItems')]: [
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.motions'),
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.questions'),
      rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.settings'),
    ],
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.motions')]: {
    [NS.rdf('type')]: NS.ontola('MenuItem'),
    [NS.schema('name')]: rdf.literal('Ideeën'),
    [NS.ontola('href')]: rdf.namedNode('https://argu.dev/f/utrecht/motions'),
    [NS.schema('isPartOf')]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: rdf.namedNode('http://fontawesome.io/icon/lightbulb-o'),
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.questions')]: {
    [NS.rdf('type')]: NS.ontola('MenuItem'),
    [NS.schema('name')]: rdf.literal('Vraagstukken'),
    [NS.ontola('href')]: rdf.namedNode('https://argu.dev/f/utrecht/questions'),
    [NS.schema('isPartOf')]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: rdf.namedNode('http://fontawesome.io/icon/question'),
  },
  [rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums.settings')]: {
    [NS.rdf('type')]: NS.ontola('MenuItem'),
    [NS.schema('name')]: rdf.literal('Instellingen'),
    [NS.ontola('href')]: rdf.namedNode('https://argu.dev/utrecht/settings'),
    [NS.schema('isPartOf')]: rdf.namedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: rdf.namedNode('http://fontawesome.io/icon/gear'),
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
