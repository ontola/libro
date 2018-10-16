import { Literal, NamedNode } from 'rdflib';
import { create } from 'react-test-renderer';

import { NS } from '../../helpers/LinkedRenderStore';
import * as ctx from '../../../tests/link-redux/fixtures';

import components from './Navbar_organization';

const subject = new NamedNode('https://argu.dev/o/1');

const resources = {
  [subject]: {
    [NS.rdf('type')]: NS.argu('Page'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2014-11-28T04:17:29+01:00')),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2015-03-24T12:31:06+01:00')),
    [NS.schema('name')]: new Literal('Gemeente Utrecht'),
    [NS.schema('description')]: new Literal('Gemeente utrecht'),
    [NS.argu('navigationsMenu')]: new NamedNode('https://argu.dev/o/1/menus/navigations'),
    [NS.schema('image')]: new NamedNode('https://argu.dev/media_objects/826'),
    [NS.argu('voteMatches')]: new NamedNode('https://argu.dev/o/1/vote_matches?type=paginated'),
  },
  [new NamedNode('https://argu.dev/media_objects/826')]: {
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2016-06-01T16:50:06+02:00')),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2016-06-01T16:50:06+02:00')),
    [NS.schema('url')]: new NamedNode('https://argu.dev/photos/826/utrecht.png'),
    [NS.schema('thumbnail')]: new NamedNode('https://argu-logos.s3.amazonaws.com/photos/826/icon_utrecht.png'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations')]: {
    [NS.rdf('type')]: [
      new NamedNode('http://www.w3.org/ns/iana/media-types/text/n3#Resource'),
      new NamedNode('http://www.w3.org/2007/ont/link#Document'),
      NS.argu('Menu'),
      new NamedNode('http://www.w3.org/2007/ont/link#RDFDocument'),
    ],
    [NS.schema('name')]: new Literal('Navigations'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus'),
    [NS.argu('menuItems')]: [
      new NamedNode('https://argu.dev/o/1/menus/navigations#settings'),
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    ],
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#settings')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Instellingen'),
    [NS.argu('href')]: new NamedNode('https://argu.dev/o/gemeente_utrecht/settings'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums')]: {
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
    [NS.argu('href')]: new NamedNode('https://argu.dev/f/utrecht/motions'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/lightbulb-o'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.questions')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Vraagstukken'),
    [NS.argu('href')]: new NamedNode('https://argu.dev/f/utrecht/questions'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/question'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums.settings')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.schema('name')]: new Literal('Instellingen'),
    [NS.argu('href')]: new NamedNode('https://argu.dev/utrecht/settings'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
  },
};

function represent(topology) {
  it('renders the correct representation', () => {
    const context = ctx.loc({
      components,
      resources,
      subject,
      topology,
    });
    const tree = create(context);
    expect(tree).toMatchSnapshot();
  });
}

describe('Navbar', () => {
  describe('organization', () => {
    describe('as argu:sidebar', () => {
      represent(NS.argu('sidebar'));
    });
  });
});
