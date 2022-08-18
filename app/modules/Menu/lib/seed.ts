import rdf, { Quadruple } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';

import http from '../../../ontology/http';
import app from '../../Common/ontology/app';
import { quadruple } from '../../Kernel/lib/quadruple';
import ll from '../../Kernel/ontology/ll';
import ontola from '../../Kernel/ontology/ontola';

export const seed: Quadruple[] = [
  quadruple(ontola.MenuItem, rdfx.type, rdfs.Class),
  quadruple(ontola.MenuItem, rdfs.subClassOf, schema.Thing),
  quadruple(app.menu, rdfx.type, app.Menu),
  quadruple(app.menu, http.statusCode, rdf.literal(HttpStatus.OK), ll.meta),
];
