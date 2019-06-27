import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link } from 'link-redux';
import { Literal } from 'rdflib';
import React from 'react';

import { NS } from '../../../tests';

import components from './index';

const testClass = LinkedRenderStore.registerRenderer(
  link([NS.as('name')])(({ name }) => <p className="testComp">{name.value}</p>),
  NS.example('TestClass'),
  RENDER_CLASS_NAME,
  [undefined, NS.argu('cardList')]
);

const ITEMS = 10;

const collectionWithPages = NS.app('nederland/q/75/m');
const collectionWithItems = NS.app('nederland/q/75/m?page=1&type=paginated');
const memberResource = NS.example('nederland/m/177');

const resources = {
  [collectionWithPages]: {
    [NS.rdf('type')]: [
      NS.as('Collection'),
      NS.ontola('Collection'),
    ],
    [NS.as('name')]: new Literal('Ideeën'),
    [NS.ontola('iriTemplate')]: new Literal('https://argu.localdev/nederland/q/75/m{?filter%5B%5D,page,page_size,type,before,sort%5B%5D}'),
    [NS.schema('isPartOf')]: NS.app('nederland/q/75'),
    [NS.as('totalItems')]: Literal.fromNumber(ITEMS),
    [NS.schema('potentialAction')]: NS.app('nederland/q/75/m/new'),
    [NS.ontola('defaultType')]: new Literal('paginated'),
    [NS.as('pages')]: collectionWithItems,
    [NS.dc('identifier')]: NS.app('nederland/q/75/motions'),
    [NS.ontola('createAction')]: NS.app('nederland/q/75/m/new'),
    [NS.schema('url')]: collectionWithPages,
    [NS.ontola('baseCollection')]: NS.app('new_volunteers'),
    [NS.ontola('collectionDisplay')]: NS.ontola('collectionDisplay/default'),
    [NS.ontola('collectionType')]: NS.ontola('collectionType/paginated'),
    [NS.as('first')]: collectionWithItems,
    [NS.as('last')]: NS.app('nederland/q/75/m?page=2&type=paginated'),
  },
  [memberResource]: {
    [NS.rdf('type')]: NS.example('TestClass'),
    [NS.schema('name')]: new Literal('Member name'),
    [NS.schema('text')]: new Literal('Member text'),
  },
};

describeView('Collection', [testClass, ...components], resources, collectionWithPages, () => {
  it('renders the views', () => {
    expect(subject.find('Pages').find('LinkedResourceContainer')).toHaveProp('subject', collectionWithItems);
  });
});
