import {
  NamedNode,
  Namespace,
  createNS,
} from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as foaf from '@ontologies/foaf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { arrayToSeqQuads } from '@rdfdev/collections';

import { frontendIRIStr } from '../../Kernel/lib/frontendIRIComponents';

import dbo from './dbo';
import wdt from './wdt';

export const trailing = (iri: string): string => iri.endsWith('/') ? iri : `${iri}/`;

interface AppNS {
  ns: Namespace;

  contents: NamedNode;
  parent: NamedNode;
  thumbnail: NamedNode;
  title: NamedNode;

  AppSignOut: NamedNode;
  Menu: NamedNode;

  bannerMembers: NamedNode;
  c_a: NamedNode;
  collectionResource: NamedNode;
  currentTab: NamedNode;
  empty: NamedNode;
  menu: NamedNode;
  menuTabs: NamedNode;
  n: NamedNode;
  omniform: NamedNode;
  pagination: NamedNode;
  policy: NamedNode;
  privacy: NamedNode;
  search: NamedNode;
  target: NamedNode;

  ['individuals/searchTarget']: NamedNode;
}

export const createAppNS = (websiteIRI: string): AppNS => {
  const app = createNS(trailing(websiteIRI));

  return {
    ns: app,

    // eslint-disable-next-line sort-keys
    contents: app('contents'),
    parent: app('parent'),
    thumbnail: app('thumbnail'),
    title: app('title'),

    /* classes */
    // eslint-disable-next-line sort-keys
    AppSignOut: app('AppSignOut'),
    Menu: app('Menu'),

    /* properties */
    bannerMembers: app('banners?page=1#members'),
    c_a: app('c_a'),
    collectionResource: app('collectionResource'),
    currentTab: app('currentTab'),
    empty: app('empty'),
    menu: app('menu'),
    menuTabs: app('menuTabs'),
    n: app('n'),
    omniform: app('omniform'),
    pagination: app('pagination'),
    policy: app('policy'),
    privacy: app('privacy'),
    search: app('search'),
    target: app('target'),

    /* individuals */
    // eslint-disable-next-line sort-keys
    ['individuals/searchTarget']: app('individuals/searchTarget'),
  };
};

const contextAppNS = createAppNS(frontendIRIStr);

const contents = contextAppNS.ns('contents');
const parent = contextAppNS.ns('parent');
const thumbnail = contextAppNS.ns('thumbnail');
const title = contextAppNS.ns('title');

export const contentsProps = [schema.text, schema.description, dcterms.description];
export const thumbnailProps = [dbo.thumbnail, wdt.ns('P18')];
export const titleProps = [schema.name, rdfs.label, foaf.name, dcterms.title];
export const parentProps = [schema.isPartOf, schema.superEvent, dcterms.isReferencedBy];

export const appOntology = [
  ...arrayToSeqQuads(contentsProps, contents),
  ...arrayToSeqQuads(thumbnailProps, thumbnail),
  ...arrayToSeqQuads(titleProps, title),
  ...arrayToSeqQuads(parentProps, parent),
];

export default contextAppNS;
