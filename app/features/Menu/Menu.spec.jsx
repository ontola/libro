import { Literal, NamedNode } from 'rdflib';
import { create } from 'react-test-renderer';

import { NS } from '../../helpers/LinkedRenderStore';
import { createContext } from '../../../tests/specHelper';

import components from './Menu';

const resource = new NamedNode('https://argu.dev/o/1/menus/navigations#forums');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.argu('MenuSection'),
    [NS.schema('name')]: new Literal('Forum'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations'),
    [NS.argu('menuItems')]: [
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums.motions'),
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums.questions'),
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums.settings'),
    ],
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.motions')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Ideeën'),
    [NS.schema('url')]: new Literal('https://argu.dev/f/utrecht/motions'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/lightbulb-o'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.questions')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Vraagstukken'),
    [NS.schema('url')]: new Literal('https://argu.dev/f/utrecht/questions'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/question'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.settings')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Instellingen'),
    [NS.schema('url')]: new Literal('https://argu.dev/utrecht/settings'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
  },
};

describeView('Menu', components, resources, resource, () => {
  as(NS.argu('sidebar'), () => {
    it('renders a menu', () => {
      expect(create(createContext())).toMatchSnapshot();
    });
  });
});
