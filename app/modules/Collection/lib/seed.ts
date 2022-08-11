import * as as from '@ontologies/as';
import rdf, { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';

import { quadruple } from '../../Kernel/lib/quadruple';
import ontola from '../../Kernel/ontology/ontola';

const languages = {
  de: 'de',
  en: 'en',
  nl: 'nl',
};

export const seed: Quadruple[] = [
  quadruple(as.Collection, rdfs.subClassOf, rdfs.Resource),
  quadruple(ontola.Collection, rdfs.subClassOf, as.Collection),
  quadruple(ontola.InfiniteView, rdfs.subClassOf, as.CollectionPage),
  quadruple(ontola.PaginatedView, rdfs.subClassOf, as.CollectionPage),

  quadruple(ontola.relevance, rdfx.type, rdfx.Property),
  quadruple(ontola.relevance, rdfs.label, rdf.literal('Relevanz', languages.de)),
  quadruple(ontola.relevance, rdfs.label, rdf.literal('Relevance', languages.en)),
  quadruple(ontola.relevance, rdfs.label, rdf.literal('Relevantie', languages.nl)),

  quadruple(as.Create, rdfx.type, rdfs.Class),
  quadruple(as.Create, rdfs.subClassOf, as.Activity),
  quadruple(as.Update, rdfx.type, rdfs.Class),
  quadruple(as.Update, rdfs.subClassOf, as.Activity),
  quadruple(as.Delete, rdfx.type, rdfs.Class),
  quadruple(as.Delete, rdfs.subClassOf, as.Activity),
  quadruple(as.Remove, rdfx.type, rdfs.Class),
  quadruple(as.Remove, rdfs.subClassOf, as.Activity),
  quadruple(as.Accept, rdfx.type, rdfs.Class),
  quadruple(as.Accept, rdfs.subClassOf, as.Activity),
  quadruple(as.Reject, rdfx.type, rdfs.Class),
  quadruple(as.Reject, rdfs.subClassOf, as.Activity),
  quadruple(as.Add, rdfx.type, rdfs.Class),
  quadruple(as.Add, rdfs.subClassOf, as.Activity),
];
