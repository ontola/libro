import { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import argu from '../../Argu/ontology/argu';
import { quadruple } from '../../Kernel/lib/quadruple';

export const seed: Quadruple[] = [
  quadruple(argu.ns('RichText'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('RichText'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/a'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/a'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/h1'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/h1'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/h2'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/h2'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/h3'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/h3'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/h4'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/h4'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/h5'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/h5'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/h6'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/h6'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/innerHtml'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/innerHtml'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/li'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/li'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/ol'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/ol'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/p'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/p'), rdfs.subClassOf, schema.Thing),

  quadruple(argu.ns('Element/ul'), rdfx.type, rdfs.Class),
  quadruple(argu.ns('Element/ul'), rdfs.subClassOf, schema.Thing),
];
