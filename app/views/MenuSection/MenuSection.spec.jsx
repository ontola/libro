import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';

import components from './index';

const resource = new NamedNode('https://argu.dev/o/1/menus/navigations#forums');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.argu('MenuSection'),
    [NS.argu('label')]: new Literal('Forum'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations'),
    [NS.argu('menuItems')]: [
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums.motions'),
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums.questions'),
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums.settings'),
    ],
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.motions')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.argu('label')]: new Literal('Ideeën'),
    [NS.argu('href')]: new Literal('https://argu.dev/f/utrecht/motions'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/lightbulb-o'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.questions')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.argu('label')]: new Literal('Vraagstukken'),
    [NS.argu('href')]: new Literal('https://argu.dev/f/utrecht/questions'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/question'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.settings')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.argu('label')]: new Literal('Instellingen'),
    [NS.argu('href')]: new Literal('https://argu.dev/utrecht/settings'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
  },
};

describeView('MenuSection', components, resources, resource, () => {
  as(NS.argu('sidebar'), () => {
    it('renders a MenuSection', () => {
      expect(subject.find(marker('menu-section'))).toExist();
    });

    it('renders the label', () => {
      expect(subject.find(marker('MenuSectionLabel'))).toExist();
    });
  });
});
