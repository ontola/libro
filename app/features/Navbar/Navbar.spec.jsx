import { BlankNode, Literal, NamedNode } from 'rdflib';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import components, { Component } from './Navbar';

const resource = new NamedNode('https://argu.dev/o/find?iri=https%3A%2F%2Fargu.dev%2Fo%2F1');
const totalCount = 378;
const unreadCount = 6;

const resources = {
  [resource]: {
    [NS.rdf('type')]: [
      new NamedNode('http://www.w3.org/ns/iana/media-types/text/n3#Resource'),
      new NamedNode('http://www.w3.org/2007/ont/link#Document'),
      new NamedNode('http://www.w3.org/2007/ont/link#RDFDocument'),
    ],
    [NS.argu('contains')]: NS.app('nederland'),
  },
  [NS.app('nederland')]: {
    [NS.schema('description')]: new Literal(''),
    [NS.argu('blogPosts')]: NS.app('nederland/blog'),
    [NS.schema('image')]: NS.app('media_objects/17843'),
    [NS.schema('dateModified')]: Literal.fromDate(new Date('2017-10-20T14:04:15+02:00')),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2017-10-20T14:04:15+02:00')),
    [NS.dc('identifier')]: NS.app('nederland'),
    [NS.rdf('type')]: NS.argu('Page'),
    [NS.argu('navigationsMenu')]: NS.app('nederland/menus/navigations'),
    [NS.argu('voteMatches')]: NS.app('nederland/vote_matches'),
    [NS.argu('questions')]: NS.app('nederland/discussions'),
    [NS.schema('potentialAction')]: NS.app('nederland/vote_matches/new'),
    [NS.schema('name')]: new Literal('Nederland'),
  },
  [NS.app('media_objects/17843')]: {
    [NS.ll('nop')]: Literal.fromNumber(0),
    [NS.schema('isPartOf')]: NS.app('nederland'),
    [NS.schema('url')]: NS.app('photos/17843/nederland.png'),
    [NS.schema('dateCreated')]: Literal.fromDate(new Date('2016-06-01T16:36:38+02:00')),
    [NS.dc('identifier')]: NS.app('media_objects/17843'),
    [NS.rdf('type')]: NS.schema('ImageObject'),
    [NS.schema('contentUrl')]: new NamedNode('https://argu-logos.s3.amazonaws.com/photos/734/freeformatter-decoded.png'),
    [NS.schema('thumbnail')]: new NamedNode('https://argu-logos.s3.amazonaws.com/photos/734/icon_freeformatter-decoded.png'),
  },
  [NS.app('nederland/menus/navigations')]: {
    [NS.schema('isPartOf')]: NS.app('nederland/menus'),
    [NS.argu('menuItems')]: new BlankNode('12_g69837729252540'),
    [NS.schema('name')]: new Literal('Navigations'),
    [NS.dc('identifier')]: NS.app('nederland/menus/navigations'),
    [NS.rdf('type')]: NS.argu('MenuItem'),
  },
  [new BlankNode('12_g69837729252540')]: {
    [NS.rdf('_1')]: NS.app('nederland/menus/navigations#forums'),
    [NS.rdf('_0')]: NS.app('nederland/menus/navigations#settings'),
    [NS.dc('identifier')]: new BlankNode('12_g69837729252540'),
    [NS.rdf('type')]: NS.rdf('Seq'),
  },
  [NS.app('nederland/menus/navigations#settings')]: {
    [NS.schema('isPartOf')]: NS.app('nederland/menus/navigations'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/gear'),
    [NS.schema('name')]: new Literal('Instellingen'),
    [NS.dc('identifier')]: NS.app('nederland/menus/navigations#settings'),
    [NS.argu('href')]: new Literal('https://argu.localdev/nederland/settings'),
    [NS.rdf('type')]: NS.argu('MenuItem'),
  },
  [NS.app('nederland/menus/navigations#forums')]: {
    [NS.schema('isPartOf')]: NS.app('nederland/menus/navigations'),
    [NS.argu('menuItems')]: new BlankNode('12_g69837780660080'),
    [NS.schema('name')]: new Literal('Forum'),
    [NS.dc('identifier')]: NS.app('nederland/menus/navigations#forums'),
    [NS.rdf('type')]: NS.argu('MenuSection'),
  },
  [new BlankNode('12_g69837780660080')]: {
    [NS.rdf('_1')]: NS.app('nederland/menus/navigations#forums.new_discussion'),
    [NS.rdf('_2')]: NS.app('nederland/menus/navigations#forums.activity'),
    [NS.rdf('_0')]: NS.app('nederland/menus/navigations#forums.overview'),
    [NS.dc('identifier')]: new BlankNode('12_g69837780660080'),
    [NS.rdf('type')]: NS.rdf('Seq'),
  },
  [NS.app('nederland/menus/navigations#forums.overview')]: {
    [NS.schema('isPartOf')]: NS.app('nederland/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/th-large'),
    [NS.schema('name')]: new Literal('Overzicht'),
    [NS.dc('identifier')]: NS.app('nederland/menus/navigations#forums.overview'),
    [NS.argu('href')]: NS.app('nederland/forum'),
    [NS.rdf('type')]: NS.argu('MenuItem'),
  },
  [NS.app('nederland/menus/navigations#forums.new_discussion')]: {
    [NS.schema('isPartOf')]: NS.app('nederland/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/plus'),
    [NS.schema('name')]: new Literal('Nieuwe discussie'),
    [NS.dc('identifier')]: NS.app('nederland/menus/navigations#forums.new_discussion'),
    [NS.argu('href')]: NS.app('nederland/forum/discussions/new'),
    [NS.rdf('type')]: NS.argu('MenuItem'),
  },
  [NS.app('nederland/menus/navigations#forums.activity')]: {
    [NS.schema('isPartOf')]: NS.app('nederland/menus/navigations#forums'),
    [NS.schema('image')]: new NamedNode('http://fontawesome.io/icon/feed'),
    [NS.schema('name')]: new Literal('Activiteit'),
    [NS.dc('identifier')]: NS.app('nederland/menus/navigations#forums.activity'),
    [NS.argu('href')]: NS.app('nederland/forum/feed'),
    [NS.rdf('type')]: NS.argu('MenuItem'),
  },
  [NS.app('n')]: {
    [NS.ll('nop')]: Literal.fromNumber(0),
    [NS.as('name')]: new Literal('Notifications'),
    [NS.argu('defaultType')]: new Literal('infinite'),
    [NS.dc('identifier')]: NS.app('n'),
    [NS.rdf('type')]: [
      NS.argu('Collection'),
      NS.as('Collection'),
    ],
    [NS.schema('potentialAction')]: NS.app('n/new'),
    [NS.as('totalItems')]: Literal.fromNumber(totalCount),
    [NS.argu('unreadCount')]: Literal.fromNumber(unreadCount),
    [NS.argu('iriTemplate')]: new Literal('https://argu.localdev/n{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
    [NS.as('pages')]: NS.app('n?type=infinite&before=2018-03-22%2010%3A42%3A42'),
    [NS.argu('createAction')]: NS.app('n/new'),
  },
};

describeView('Navbar', components, resources, resource, () => {
  set('ch', () => <Component />);

  describe('as default', () => {
    it('renders the organization name', () => {
      expect(subject.find('OrganizationName .OrganizationName__value'))
        .toHaveText('Nederland');
    });

    it('renders the forum items', () => {
      const forumSection = subject.find('.NavBarContent__top MenuSection');
      expect(forumSection.find('MenuItemSidebar[data-test="Seq-0-https://argu.dev/nederland/menus/navigations#forums.overview"] SideBarLinkLink Link'))
        .toHaveText('Overzicht');
      expect(forumSection.find('MenuItemSidebar[data-test="Seq-1-https://argu.dev/nederland/menus/navigations#forums.new_discussion"] SideBarLinkLink Link'))
        .toHaveText('Nieuwe discussie');
      expect(forumSection.find('MenuItemSidebar[data-test="Seq-2-https://argu.dev/nederland/menus/navigations#forums.activity"] SideBarLinkLink Link'))
        .toHaveText('Activiteit');
    });
  });
});
