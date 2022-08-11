import rdf, { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { arrayToSeqQuads } from '@rdfdev/collections';

import { quadruple } from '../../Kernel/lib/quadruple';
import contextAppNS, {
  contentsProps,
  parentProps,
  thumbnailProps,
  titleProps,
} from '../ontology/app';

const languages = {
  de: 'de',
  en: 'en',
  nl: 'nl',
};

const contents = contextAppNS.ns('contents');
const parent = contextAppNS.ns('parent');
const thumbnail = contextAppNS.ns('thumbnail');
const title = contextAppNS.ns('title');

export const seed: Quadruple[] = [
  quadruple(schema.CreativeWork, rdfx.type, rdfs.Class),
  quadruple(schema.CreativeWork, rdfs.subClassOf, schema.Thing),

  quadruple(schema.MediaObject, rdfx.type, rdfs.Class),
  quadruple(schema.MediaObject, rdfs.subClassOf, schema.CreativeWork),
  quadruple(schema.MediaObject, rdfs.comment, rdf.literal('A media object, such as an image, video, or audio object ')),
  quadruple(schema.MediaObject, rdfs.label, rdf.literal('MediaObject', languages.en)),

  quadruple(schema.ImageObject, rdfs.subClassOf, schema.MediaObject),

  quadruple(schema.VideoObject, rdfx.type, rdfs.Class),
  quadruple(schema.VideoObject, rdfs.subClassOf, schema.MediaObject),

  quadruple(schema.WebPage, rdfx.type, rdfs.Class),
  quadruple(schema.WebPage, rdfs.subClassOf, schema.Thing),
  quadruple(schema.WebPage, rdfs.label, rdf.literal('Seite', languages.de)),
  quadruple(schema.WebPage, rdfs.label, rdf.literal('Page', languages.en)),
  quadruple(schema.WebPage, rdfs.label, rdf.literal('Pagina', languages.nl)),

  quadruple(schema.WebSite, rdfx.type, rdfs.Class),
  quadruple(schema.WebSite, rdfs.subClassOf, schema.Thing),

  quadruple(rdf.namedNode('component:Button'), rdfx.type, rdfs.Class),
  quadruple(rdf.namedNode('component:Button'), rdfs.subClassOf, schema.Thing),

  ...arrayToSeqQuads(contentsProps, contents),
  ...arrayToSeqQuads(thumbnailProps, thumbnail),
  ...arrayToSeqQuads(titleProps, title),
  ...arrayToSeqQuads(parentProps, parent),
];
