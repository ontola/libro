import { createNS } from '@ontologies/core';
import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { arrayToSeqQuads } from '@rdfdev/collections';

import { frontendIRIStr } from '../middleware/app';
import dbo from './dbo';
import wdt from './wdt';

const app = createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);
const appSlashless = createNS(frontendIRIStr.slice(0, frontendIRIStr.endsWith('/') ? -1 : undefined));

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
  nsSlashless: appSlashless,

  contents,
  thumbnail,
  title,

  /* classes */
  AppSignIn: app('AppSignIn'),
  AppSignOut: app('AppSignOut'),

  /* properties */
  c_a: app('c_a'),
  menu: app('menu'),
  n: app('n'),
  omniform: app('omniform'),
  policy: app('policy'),
  privacy: app('privacy'),
  search: app('search'),
};
