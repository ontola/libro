import { Literal, NamedNode } from 'rdflib';

import { NS } from '../../../tests';

import components from './index';

const resource = new NamedNode('https://argu.dev/menus/user');
const showResource = new NamedNode('https://argu.dev/menus/user#show');

const resources = {
  [resource]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Maarten van Scharendrecht'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus'),
    [NS.argu('menuItems')]: [
      new NamedNode('https://argu.dev/menus/user#show'),
      new NamedNode('https://argu.dev/menus/user#profile'),
      new NamedNode('https://argu.dev/menus/user#settings'),
    ],
  },
  [showResource]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Gebruiker weergeven'),
    [NS.argu('href')]: new Literal('https://argu.dev/u/maartenvscharendrecht'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/user'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/user'),
  },
  [new NamedNode('https://argu.dev/menus/user#profile')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Profiel bewerken'),
    [NS.argu('href')]: new Literal('https://argu.dev/settings?tab=profile'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/user'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/pencil'),
  },
  [new NamedNode('https://argu.dev/menus/user#settings')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Gebruikersinstellingen'),
    [NS.argu('href')]: new Literal('https://argu.dev/settings'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/menus/user'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
  },
};

describeView('MenuItem', components, resources, resource, () => {
  as(NS.argu('sidebar'), () => {
    describe('with children', () => {
      it('renders the children', () => {
        expect(subject.find(marker('menuItems', 'collapsible'))).toExist();
      });
    });

    describe('without children', () => {
      set('s', () => showResource);

      it('renders the label', () => {
        expect(subject.find(marker('MenuItemLabel'))).toExist();
      });
    });
  });
});
