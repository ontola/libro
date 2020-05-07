import rdf, { createNS } from '@ontologies/core';
import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { arrayToSeqQuads } from '@rdfdev/collections';
import { getMetaContent } from '../helpers/arguHelpers';

import dbo from './dbo';
import wdt from './wdt';

export const website = getMetaContent('website-iri') || 'https://example.com';
export const frontendIRI = rdf.namedNode(website!);
export const frontendIRIStr = frontendIRI.value;
export const frontendPathname = new URL(frontendIRIStr).pathname;
export const frontendOrigin = new URL(frontendIRIStr).origin;

const app = createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);

const contents = app('contents');
const thumbnail = app('thumbnail');
const title = app('title');

export const appOntology = [
    ...arrayToSeqQuads([schema.text, schema.description], contents),
    ...arrayToSeqQuads([dbo.thumbnail, wdt.ns('P18')], thumbnail),
    ...arrayToSeqQuads([schema.name, rdfs.label, foaf.name], title),
];

export default {
  ns: app,

  contents,
  thumbnail,
  title,

  /* classes */
  AppSignIn: app('AppSignIn'),
  AppSignOut: app('AppSignOut'),
  Menu: app('Menu'),

  /* properties */
  bannerMembers: app('banners?page=1#members'),
  c_a: app('c_a'),
  currentPage: app('currentPage'),
  menu: app('menu'),
  n: app('n'),
  omniform: app('omniform'),
  policy: app('policy'),
  privacy: app('privacy'),
  search: app('search'),
};
