import { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';

import { quadruple } from '../../Kernel/lib/quadruple';
import ontola from '../../Kernel/ontology/ontola';

export const seed: Quadruple[] = [
  quadruple(ontola.MenuItem, rdfx.type, rdfs.Class),
  quadruple(ontola.MenuItem, rdfs.subClassOf, schema.Thing),
];
