import rdf, { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import ll from '../ontology/ll';

import { quadruple } from './quadruple';

const languages = {
  de: 'de',
  en: 'en',
  nl: 'nl',
};

export const seed: Quadruple[] = [
  quadruple(schema.Thing, rdfs.subClassOf, rdfs.Resource),
  quadruple(ll.loadingResource, rdfx.type, ll.LoadingResource),

  quadruple(schema.Thing, rdfx.type, rdfs.Class),
  quadruple(schema.Thing, rdfs.comment, rdf.literal('The most generic type of item.')),
  quadruple(schema.Thing, rdfs.label, rdf.literal('Thing', languages.en)),

  quadruple(schema.name, rdfx.type, rdfx.Property),
];
