import { Literal, NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import components, { Component } from './Navbar';

const resource = new NamedNode('https://argu.dev/o/find?iri=https%3A%2F%2Fargu.dev%2Fo%2F1');
const pageSize = 10;
const totalCount = 378;
const unreadCount = 6;

const resources = {
  [resource]: {
    [NS.rdf('type')]: [
      new NamedNode('http://www.w3.org/ns/iana/media-types/text/n3#Resource'),
      new NamedNode('http://www.w3.org/2007/ont/link#Document'),
      new NamedNode('http://www.w3.org/2007/ont/link#RDFDocument'),
    ],
    [NS.argu('contains')]: new NamedNode('https://argu.dev/o/1'),
  },
  [new NamedNode('https://argu.dev/o/1')]: {
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
    [NS.argu('label')]: new Literal('Navigations'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus'),
    [NS.argu('menuItems')]: [
      new NamedNode('https://argu.dev/o/1/menus/navigations#settings'),
      new NamedNode('https://argu.dev/o/1/menus/navigations#forums'),
    ],
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#settings')]: {
    [NS.rdf('type')]: NS.argu('MenuItem'),
    [NS.argu('label')]: new Literal('Instellingen'),
    [NS.argu('href')]: new Literal('https://argu.dev/o/gemeente_utrecht/settings'),
    [NS.schema('isPartOf')]: new NamedNode('https://argu.dev/o/1/menus/navigations'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
  },
  [new NamedNode('https://argu.dev/o/1/menus/navigations#forums')]: {
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
  [NS.app('n?type=infinite')]: {
    [NS.rdf('type')]: NS.argu('InfiniteCollection'),
    [NS.dc('identifier')]: NS.app('n?type=infinite'),
    [NS.schema('name')]: new Literal('Notifications'),
    [NS.argu('first')]: NS.app('n?type=infinite&before=2018-03-22%2010%3A42%3A42'),
    [NS.argu('pageSize')]: Literal.fromNumber(pageSize),
    [NS.argu('totalCount')]: Literal.fromNumber(totalCount),
    [NS.argu('unreadCount')]: Literal.fromNumber(unreadCount),
  }
};

describeView('Navbar', components, resources, resource, () => {
  set('ch', () => <Component />);

  describe('as default', () => {
    it('renders the correct representation', () => {
      expect(subject.find(Component)).toMatchSnapshot();
    });
  });
});
